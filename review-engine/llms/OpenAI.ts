import "dotenv/config";
import { ChatGroq } from "@langchain/groq";
import readline from "readline/promises";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { TavilySearch } from "@langchain/tavily";
import {StateGraph,MessagesAnnotation,} from "@langchain/langgraph";

const GroqApiKey = process.env.GROQ_API_KEY;
const tavilyApiKey = process.env.TAVILY_API_KEY;

if (!GroqApiKey)
  throw new Error("GROQ API key is not found...");

if (!tavilyApiKey)
  throw new Error("TAVILY API key is not found...");


const tavilySearch = new TavilySearch({
  maxResults: 3,
  tavilyApiKey,
  topic: "general",
});

const tools = [tavilySearch];

const toolNode = new ToolNode(tools);


const llm = new ChatGroq({
  apiKey: GroqApiKey,
  temperature: 0.8,
  model: "openai/gpt-oss-120b",
}).bindTools(tools);


async function createAgent(state: typeof MessagesAnnotation.State) {

  console.log("LLM calling happening....");

  const response = await llm.invoke(state.messages);

  return {
    messages: [response],
  };
}


function conditionalEdge(state: any) {

  const lastMessage = state.messages.at(-1);

  if (lastMessage?.tool_calls?.length) {
    return "tools";
  }

  return "__end__";
}


const workflow = new StateGraph(MessagesAnnotation)
                    .addNode("agent", createAgent)
                    .addNode("tools", toolNode)
                    .addEdge("__start__", "agent")
                    .addEdge("tools", "agent")
                    .addConditionalEdges("agent", conditionalEdge)



const app = workflow.compile();

async function main() {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {

    const userInput = await rl.question("User: ");

    if (userInput.toLowerCase().trim() === "exit") {
      console.log("Exiting...");
      rl.close();
      break;
    }

    const result = await app.invoke({
      messages: [
        {
          role: "user",
          content: userInput,
        },
      ],
    });

    console.log(
      "AI:",
      result.messages.at(-1)?.content
    );
  }
}

main();