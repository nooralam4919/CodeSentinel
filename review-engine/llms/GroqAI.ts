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

export const llm = new ChatGroq({
  apiKey: GroqApi,
  model: "openai/gpt-oss-120b",
  temperature: 0.9
}).bindTools(tools)
