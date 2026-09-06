import { ApiError } from "../Utility/ApiError.js"
import { ApiResponse } from "../Utility/ApiResponse.js"
import { asyncHandler } from "../Utility/AsyncHandler.js"
import { Request, Response } from "express"

const QuaryRouterController = asyncHandler(async(req: Request, res: Response) => {
    const {query} = req.body;

    if(!query)
        throw new ApiError(401, "query is not prenst in review controller")

    res.status(200).json(
        new ApiResponse(
            200,
            {query},
            "query "
        )
    )
})


export {
    QuaryRouterController
}