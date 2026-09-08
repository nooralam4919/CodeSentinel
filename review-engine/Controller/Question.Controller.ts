import { Request, Response } from "express";
import { Embedding } from "../rag/embedding/Embedding.js";

export const questionEmbeddingController = async (req: Request, res: Response ) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                message: "Question is not found",
            });
        }

        console.log("Question received from Backend:", question);

        const questionEmbedding = await Embedding(question);

        // // console.log("EMBEDDING:", questionEmbedding);


        return res.status(200).json({
            message: "Question received successfully",
            data: questionEmbedding,
        });

    } catch (error) {
        console.log(
            "Error from Review Engine Question Controller:",
            error
        );

        return res.status(400).json({
            message: "Question processing failed",
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown error",
        });
    }
};