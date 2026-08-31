import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asynHandle.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const RagController = asyncHandler( async (req: Request, res: Response) => {
        // console.log("FULL BODY:", req.body);

        const { content } = req.body;

        // console.log("CONTENT:", content);
        // console.log("TYPE:", typeof content);
        // console.log("IS ARRAY:", Array.isArray(content));

        console.log("this is in my backend", content);

        

        return res.status(200).json(
            new ApiResponse(
                200,
                content,
                "Content received successfully"
            )
        );
    }
);