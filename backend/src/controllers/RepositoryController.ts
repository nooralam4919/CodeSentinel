import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynHandle.js";
import { Request, Response } from "express";
import {cloneRepository} from '../utils/cloneRepository.js'
import {scanRepository} from '../utils/scanRepository.js'
import { Chunking } from "../services/Chunking.service.js";


const RepoRequest = asyncHandler(
    async (req: Request, res: Response) => {

        const { cloneUrl } = req.body;
        const userId = req.userId;

        if (!cloneUrl) {
            throw new ApiError(400, "cloneUrl is not found");
        }

        if(!userId)
            throw new ApiError(400, "user is not found")

        console.log("Repository URL:", cloneUrl);

        // Clone GitHub repository
        const repoPath = await cloneRepository(cloneUrl);
        console.log("this is my repo clone", repoPath)

        // scan repo
        const scanRepo = await scanRepository(repoPath);
        console.log(scanRepo.length);
        console.log(scanRepo);

        // chunking docomnet
        const chunkingAPItoRevieEngi = await Chunking(scanRepo);
        console.log("this is my chuning API call", chunkingAPItoRevieEngi)


        res.status(200).json(
            new ApiResponse(
                200,
                { cloneUrl, repoPath, scanRepo },
                "Successfully got the repository URL"
            )
        );
    }
);

export {
    RepoRequest
};