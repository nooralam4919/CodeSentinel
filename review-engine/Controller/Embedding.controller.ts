import { Request, Response } from "express";
import { Embedding } from "../rag/embedding/Embedding.js";

export const EmbeddingController = async ( req: Request, res: Response ) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({
                message: "content is not present",
            });
        }

        if (typeof content !== "string") {
            return res.status(400).json({
                message: "content must be a string",
                receivedType: typeof content,
                isArray: Array.isArray(content),
            });
        }

        const response = await Embedding(content);

        return res.status(200).json({
            message: "Embedding successful",
            embedding: response,
        });

    } catch (error) {
        console.error("❌ Embedding model error:", error);

        return res.status(500).json({
            message: "Embedding failed",
            error: error instanceof Error
                ? error.message
                : String(error),
        });
    }
};