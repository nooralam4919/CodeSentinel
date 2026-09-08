// import "dotenv/config";
// import { ChatGroq } from "@langchain/groq";
// import { TavilySearch } from "@langchain/tavily";

// const GroqApiKey = process.env.GROQ_API_KEY;
// const TavilyApiKey = process.env.TAVILY_API_KEY;

// if (!GroqApiKey) {
//     throw new Error("GROQ API key is not found");
// }

// if (!TavilyApiKey) {
//     throw new Error("TAVILY API key is not found");
// }


// // ===============================
// // Tavily Search
// // ===============================

// export const tavilySearch = new TavilySearch({
//     maxResults: 3,
//     tavilyApiKey: TavilyApiKey,
//     topic: "general",
// });


// // ===============================
// // Tools
// // ===============================

// export const tools = [ tavilySearch ];


// // ===============================
// // Groq LLM
// // ===============================

// export const llm = new ChatGroq({
//     apiKey: GroqApiKey,
//     temperature: 0.2,
//     model: "openai/gpt-oss-120b",
// }).bindTools(tools);




import "dotenv/config"
import { ChatGroq } from "@langchain/groq"
import { TavilySearch } from "@langchain/tavily";

const GroqApi = process.env.GROQ_API_KEY;
const TavilyApi = process.env.TAVILY_API_KEY;

if(!GroqApi)
  throw new Error("ChatGroq api is not found");

if(!TavilyApi) 
  throw new Error("TavilySeach api is not found")



const tavilySearch = new TavilySearch({
  tavilyApiKey: TavilyApi,
  maxResults: 4,
  topic: "general"
})

export const tools = [ tavilySearch ];

const llm = new ChatGroq({
  apiKey: GroqApi,
  model: "openai/gpt-oss-120b",
  temperature: 0.9
}).bindTools(tools)
