import { StateGraph, MessagesAnnotation, } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { llm, tools, } from "./GroqAI.js";


// ===============================
// Tool Node
// ===============================

const toolNode = new ToolNode(tools);


// ===============================
// Base LLM / Agent
// ===============================

async function baseLLM(state: any) {

    console.log("LLM calling happening....");

    const response = await llm.invoke(
        state.messages
    );

    return {
        messages: [response],
    };
}


// ===============================
// Conditional Edge
// ===============================

function conditionalEdge(state: any) {

    const lastMessage = state.messages.at(-1);

    if (lastMessage?.tool_calls?.length) {

        console.log("Tavily tool calling...");

        return "tools";
    }

    return "__end__";
}


// ===============================
// LangGraph Workflow
// ===============================

const workflow = new StateGraph(MessagesAnnotation)

    .addNode("agent", baseLLM)

    .addNode("tools", toolNode)

    .addEdge("__start__", "agent")

    .addEdge("tools", "agent")

    .addConditionalEdges(
        "agent",
        conditionalEdge
    );


// ===============================
// Compile
// ===============================

const app = workflow.compile();


// ===============================
// Generate Answer
// ===============================

export const generateAnswer = async ( question: string, context: string ) => {

    const result = await app.invoke({

        messages: [

            {
                role: "system",

                content: `
                        You are CodeSentinel, an AI assistant
                        for understanding software codebases.

                        You have access to:

                        1. Relevant code retrieved from the
                        user's repository.

                        2. Tavily web search for external
                        or current information.

                        Rules:

                        - For questions about the repository,
                        use the provided repository context first.

                        - Do not invent code or information.

                        - If the repository context is not enough
                        and the question requires external/current
                        information, use Tavily search.

                        - Explain code clearly and simply.

                        - If possible, mention the relevant file
                        or code section.

                        Repository Context:

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