import { Request, Response } from "express";
import { chunkText } from "../rag/chunking/Chunking.js";

export const scanningRouter = async ( req: Request, res: Response) => {

    try {

        const { filePath, content } = req.body;

        if (!filePath || !content) {
            return res.status(400).json({
                message: "filePath and content are required"
            });
        }

        console.log("Processing file:", filePath);

        const response = await chunkText(content);

        console.log("Chunks:", response);

        return res.status(200).json({
            statusCode: 200,
            filePath,
            chunks: response,
            message: "File chunked successfully"
        });

    } catch (error) {

        console.error(
            "Something went wrong in scanning:",
            error
        );

        return res.status(500).json({
            message: "Something went wrong in scanning"
        });
    }
};