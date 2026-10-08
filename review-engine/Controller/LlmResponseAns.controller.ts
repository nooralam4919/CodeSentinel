import { Request, Response } from "express";
import {generateAnswer} from "../llms/BaseLLM.js"

export const llmResponseAns = async (req: Request, res: Response) => {
   try {

        const { question, context } = req.body;

        if (!question || !context) {
            throw new Error("Question or context is missing");
        }

        const answer = await generateAnswer(
            question,
            context
        );

        return res.status(200).json({
            answer
        });

    } catch (error) {

        console.log(
            "Question or context did not reach Review Engine"
        );

        const cause =
            error instanceof Error
                ? error.message
                : "Unknown error";

        return res.status(400).json({
            message: cause
        });
    }
};