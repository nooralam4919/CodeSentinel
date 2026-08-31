
import { Request, Response } from "express";
import { Embedding } from '../rag/embedding/Embedding.js'
import { BackendRagService } from '../Service/BackendRag.Service.js'


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

        console.log("Embedding generated successfully");
        console.log("Vector length:", questionEmbedding.length);

        console.log("🔥 ABOUT TO SEND RESPONSE to backend for qurery vector");

        const sendToBackendForquerySearch = await BackendRagService(questionEmbedding)
        console.log(sendToBackendForquerySearch)


        return res.status(200).json({
            message: "Embedding generated successfully",
            data: questionEmbedding
        });

    } catch (error) {
        console.error("Embedding error:", error);

        return res.status(500).json({
            message: "Failed to generate embedding",
        });
    }
};