import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const Embedding = async (text: string) => {

    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: "gemini-embedding-001",
    });

    const vector = await embeddings.embedQuery(text);

    return vector;
};