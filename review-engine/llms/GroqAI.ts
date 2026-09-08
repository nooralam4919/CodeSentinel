import "dotenv/config";
import { ChatGroq } from "@langchain/groq";

const GroqApiKey = process.env.GROQ_API_KEY;

if(!GroqApiKey)
  throw new Error("GROQ api key is not present");


export const llm = new ChatGroq({
    apiKey: GroqApiKey,
    temperature: 0.2,
    model: "openai/gpt-oss-120b",
});