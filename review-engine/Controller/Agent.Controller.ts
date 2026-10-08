import { Request, Response } from "express";
import { Embedding } from '../rag/embedding/Embedding.js'
import { BackendRagService } from '../Service/BackendRag.Service.js'
import { generateAnswer } from '../llms/BaseLLM.js'


export const AgentController = async (req: Request, res: Response) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({
                message: "Content is not present in review engine",
            });
        }

        // 1. Generate question embedding
        const questionEmbedding = await Embedding(content);

        console.log("Embedding generated, vector length:", questionEmbedding.length);

        // 2. Send embedding to backend for vector similarity search
        const ragResult = await BackendRagService(questionEmbedding);

        console.log("RAG search result received:", ragResult);

        // 3. Extract relevant code chunks from search results
        const chunks: any[] = ragResult?.data ?? ragResult ?? [];

        const context = Array.isArray(chunks)
            ? chunks.map((r: any) => r.content ?? "").join("\n\n")
            : String(chunks);

        // 4. Generate LLM answer using question + retrieved context
        const answer = await generateAnswer(content, context);

        console.log("LLM answer generated");

        return res.status(200).json({
            message: "Review complete",
            answer,
        });

    } catch (error) {
        console.error("AgentController error:", error);

        return res.status(500).json({
            message: "Failed to generate review",
        });
    }
};
