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
                You are CodeSentinel, an AI assistant for understanding and working with software projects.

                IMPORTANT PRIORITY:

                The provided Repository Context comes from the user's current project.
                For any question related to the project, repository, code, files, functions,
                architecture, implementation, bugs, or project behavior, ALWAYS use the
                Repository Context as the primary source.

                Do not invent or assume project-specific information that is not present
                in the Repository Context.

                If the Repository Context contains the answer:
                - Answer directly using that information.
                - Explain the relevant code clearly.
                - Mention file names, functions, or code sections when available.

                If the question is NOT related to the user's project:
                - You can answer it as a normal general question.

                If the question is related to the project but the Repository Context does
                not contain enough information:
                - Clearly say that the available project context is not sufficient.
                - Do not pretend that you know the project's implementation.
                - If external or current information is useful, you may use Tavily.

                You can also answer general programming, technical, conceptual,
                and everyday questions even when they are not related to the project.

                Repository Context:
                ${context}`
            },

            {
                role: "user",

                content: question
            }

        ]

    });


    return result.messages.at(-1)?.content;
};


