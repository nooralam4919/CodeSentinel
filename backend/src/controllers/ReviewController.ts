import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynHandle.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Request, Response } from "express";
import { askReviewEngineService } from '../services/ReviewService.js'

const ReviewController = asyncHandler(async (req: Request, res: Response) => {
    const { question } = req.body;

    console.log("🔥 QUESTION RECEIVED BY BACKEND:", question);

    if (!question || typeof question !== "string") {
        throw new ApiError(400, "A valid question is required");
    }

    const response = await askReviewEngineService(question);

    console.log("this is in my review engine controller", response);
    

    console.log("🔥 RESPONSE FROM REVIEW ENGINE:", response);


    res.status(200).json(
        new ApiResponse(
            200,
            { response },
            "response is correct"
        )
    );
});
export {
    ReviewController
}
