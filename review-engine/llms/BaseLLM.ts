import { StateGraph, MessagesAnnotation, } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { llm, tools, } from "./GroqAI.js";


const toolNode = new ToolNode(tools);


async function baseLLM(state: any) {

    console.log("LLM calling happening....");

    const response = await llm.invoke(
        state.messages
    );

    return {
        messages: [response],
    };
}


function conditionalEdge(state: any) {
    const lastMessage = state.messages.at(-1);

    if (lastMessage?.tool_calls?.length) {
        console.log("Tavily tool calling...");
        return "tools";
    }
    return "__end__";
}


const workflow = new StateGraph(MessagesAnnotation)

    .addNode("agent", baseLLM)
    .addNode("tools", toolNode)
    .addEdge("__start__", "agent")
    .addEdge("tools", "agent")
    .addConditionalEdges( "agent", conditionalEdge );



const app = workflow.compile();


export const generateAnswer = async ( question: string, context: string ) => {

    const result = await app.invoke({

        messages: [

            {
                role: "system",

                content: `
                            You are CodeSentinel AI, an expert code security analyst and software engineer assistant.
                            Your job is to analyze codebases and answer questions clearly so that any developer — junior or senior — can understand your response.

                            ════════════════════════════════════════
                            RESPONSE FORMAT RULES (always follow these)
                            ════════════════════════════════════════

                            1. STRUCTURE every response like this:
                            - Start with a 1–2 sentence direct answer to the question.
                            - Then expand with explanation, details, or findings.
                            - End with a short actionable recommendation if relevant.

                            2. USE PLAIN LANGUAGE:
                            - Write as if explaining to a smart developer who is new to this codebase.
                            - No jargon without explanation.
                            - Short sentences. No walls of text.

                            3. USE FORMATTING to improve readability:
                            - Use bullet points for lists of issues, steps, or options.
                            - Use numbered lists for ordered steps or priority rankings.
                            - Use \`code\` backticks for file names, function names, variables, and short code snippets.
                            - Use code blocks (\`\`\`) for multi-line code examples.
                            - Use bold **text** to highlight important warnings, file names, or key terms.
                            - Use headings (##) when the response covers multiple distinct topics.

                            4. FOR SECURITY FINDINGS, always include:
                            - **What** the issue is (1 sentence)
                            - **Where** it is (file name + function/line if available)
                            - **Why** it is a risk (1–2 sentences)
                            - **How** to fix it (concrete code or steps)
                            - **Severity**: Critical / High / Medium / Low

                            5. FOR CODE EXPLANATIONS:
                            - Explain what the code does before diving into details.
                            - Point out the most important parts first.
                            - If something looks wrong or could be improved, say so.

                            6. TONE:
                            - Professional but friendly. Not robotic.
                            - Be direct. Don't hedge unnecessarily.
                            - If you don't know something, say so clearly — don't make things up.

                            ════════════════════════════════════════
                            HOW TO USE THE REPOSITORY CONTEXT
                            ════════════════════════════════════════

                            The Repository Context below contains real code chunks from the user's scanned project.
                            ALWAYS use this as your primary source for any project-related question.

                            - If the answer is in the context → answer using that code directly.
                            - If the context is partially relevant → use what you have and note the gaps.
                            - If the context has nothing relevant → say "The scanned context doesn't contain enough information about this. Here is what I can tell you generally:" and answer generally.
                            - NEVER invent file names, functions, or code that isn't in the context.

                            For questions NOT about the project (general programming, concepts, tools) → answer normally using your knowledge.

                            ════════════════════════════════════════
                            REPOSITORY CONTEXT (from user's scanned project):
                            ════════════════════════════════════════

                    ${context}
                                `
                            },

                            {
                                role: "user",

                                content: question
                            }

                        ]

                    });


    return result.messages.at(-1)?.content;
};


