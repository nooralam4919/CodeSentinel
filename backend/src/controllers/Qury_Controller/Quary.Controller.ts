import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asynHandle.js";
import { Request, Response } from "express";
import { questionChucking } from "../../services/QuestionChuncking.service.js";
import { vectorSearch } from "../../utils/vectorSearch.js";
import {llmCallTogetHumanAns} from "../../services/LLMCalling.service.js"


const QuaryRouterController = asyncHandler(async(req: Request, res: Response) => {
    const {question} = req.body

    if(!question)
        throw new ApiError(400, "use quary is not found");

    console.log("------------", question) 
    const QuestionEmbedding = await questionChucking(question); // actually is not chuncking its embedding

    if(!QuestionEmbedding)
        throw new ApiError(401, "question embedding is not recieved");

    // console.log("embedding type:", typeof QuestionEmbedding.data);
    // console.log("is array:", Array.isArray(QuestionEmbedding));


    const result = await vectorSearch(QuestionEmbedding.data, 5);
    console.log("this is present in database", result);


    const context = result
                    .map((r) => r.content)
                    .join("\n\n");

    // api call to retrive ans from llm (for question and it' related context prent in pv vector database);
    const callingLLMforAns = await llmCallTogetHumanAns(QuestionEmbedding, context);



    res.status(200).json(
        new ApiResponse(
            200,
            QuestionEmbedding,
            "got the user quary on the backend"
        )
    )
})

export {
    QuaryRouterController
}