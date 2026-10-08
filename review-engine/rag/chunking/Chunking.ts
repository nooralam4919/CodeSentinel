import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// Larger chunks = fewer total chunks = fewer embedding API calls = faster scan.
// Overlap is kept small to avoid redundant embeddings.
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 100,
});

export const chunkText = async (text: string) => {
    return await textSplitter.splitText(text);
};