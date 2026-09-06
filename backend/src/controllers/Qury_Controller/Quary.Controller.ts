import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asynHandle.js";
import { Request, Response } from "express";

const QuaryRouterController = asyncHandler(async(req: Request, res: Response) => {
    const {question} = req.body

    if(!question)
        throw new ApiError(400, "use quary is not found");

    console.log("------------", question)

    res.status(200).json(
        new ApiResponse(
            200,
            question,
            "got the user quary on the backend"
        )
    )
})

export {
    QuaryRouterController
}