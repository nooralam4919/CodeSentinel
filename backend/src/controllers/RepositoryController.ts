import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynHandle.js";
import { Request, Response } from "express";
import { cloneRepository } from "../utils/cloneRepository.js";
import { scanRepository } from "../utils/scanRepository.js";
import { Chunking } from "../services/Chunking.service.js";
import { EmbeddingService } from "../services/Embedding.service.js";
import prisma from "../lib/prisma.js";


// ============================================================
// Repository Scan Controller
// ============================================================

    const RepoRequest = asyncHandler( async (req: Request, res: Response) => {

        // ========================================================
        // 1. Get request data
        // ========================================================

        const { cloneUrl } = req.body;
        const userId = req.userId;

        if (!cloneUrl) {
            throw new ApiError(400, "cloneUrl is required");
        }

        if (!userId) {
            throw new ApiError(400, "User is not authenticated");
        }


        // ========================================================
        // 2. Extract repository name
        // ========================================================

        const repositoryName = cloneUrl
                .split("/")
                .pop()
                ?.replace(/\.git$/, "") || "unnamed-project";


        console.log("==========================================");
        console.log("Repository URL:", cloneUrl);
        console.log("Repository Name:", repositoryName);
        console.log("User ID:", userId);
        console.log("==========================================");


        // ========================================================
        // 3. Find existing project
        // ========================================================

        let project = await prisma.project.findFirst({
            where: {
                ownerId: userId,
                repositoryUrl: cloneUrl,
            },
        });


        // ========================================================
        // 4. Create project if it does not exist
        // ========================================================

        if (!project) {
            project = await prisma.project.create({
                data: {
                    name: repositoryName,
                    repositoryUrl: cloneUrl,
                    repositoryName: repositoryName,
                    ownerId: userId,
                },
            });

            console.log("Project created:", project.id);

        } else {

            console.log("Project already exists:", project.id);

            return res.status(200).json(
                new ApiResponse(
                    200,
                    {
                        projectId: project.id,
                        repositoryName,
                        repositoryUrl: cloneUrl,
                    },
                    "Repository already exists"
                )
            );
        }


        // ========================================================
        // 5. Create Scan
        // ========================================================

        const scan = await prisma.scan.create({
            data: {
                projectId: project.id,
                userId: userId,
                type: "MANUAL",
                status: "RUNNING",
            },
        });

        console.log("Scan created:", scan.id);


        try {

            // ====================================================
            // 6. Clone repository
            // ====================================================

            console.log("Cloning repository...");

            const repoPath = await cloneRepository(cloneUrl);

            console.log("Repository cloned:", repoPath);


            // ====================================================
            // 7. Scan repository
            // ====================================================

            console.log("Scanning repository...");

            const scanRepo = await scanRepository(repoPath);

            console.log(
                "Number of files:",
                scanRepo.length
            );


            if (!scanRepo || scanRepo.length === 0) {

                throw new ApiError(
                    400,
                    "No supported files found in repository"
                );
            }


            // ====================================================
            // 8. Update scan file statistics
            // ====================================================

            await prisma.scan.update({
                where: {
                    id: scan.id,
                },

                data: {
                    totalFiles: scanRepo.length,
                    scannedFiles: scanRepo.length,
                },
            });


            // ====================================================
            // 9. Chunk repository files
            // ====================================================

            console.log("Chunking repository...");

            const chunkingResult =
                await Chunking(scanRepo);

            console.log(
                "Chunking completed"
            );


            // ====================================================
            // 10. Validate chunking result
            // ====================================================

            if (
                !chunkingResult ||
                chunkingResult.length !== scanRepo.length
            ) {

                throw new ApiError(
                    500,
                    "Chunking result does not match scanned files"
                );
            }


            // ====================================================
            // 11. Generate embeddings
            // ====================================================

            const allChunks = chunkingResult.flatMap(
                (file) => file.chunks || []
            );


            console.log(
                "Total chunks:",
                allChunks.length
            );


            if (allChunks.length === 0) {

                throw new ApiError(
                    400,
                    "No code chunks were generated"
                );
            }


            console.log(
                "Generating embeddings..."
            );


            const embeddings =
                await EmbeddingService(allChunks);


            console.log(
                "Embeddings generated:",
                embeddings.length
            );


            // ====================================================
            // 12. Validate embedding count
            // ====================================================

            if (embeddings.length !== allChunks.length) {

                throw new ApiError(
                    500,
                    `Embedding count mismatch. Chunks: ${allChunks.length}, Embeddings: ${embeddings.length}`
                );
            }


            // ====================================================
            // 13. Save ScanFile + CodeChunk
            // ====================================================

            let globalChunkIndex = 0;


            for ( let fileIndex = 0; fileIndex < scanRepo.length; fileIndex++) {

                const filePath = scanRepo[fileIndex];

                const fileResult =
                    chunkingResult[fileIndex];


                if (!fileResult) {
                    console.warn(
                        `No chunking result for file: ${filePath}`
                    );

                    continue;
                }


                const fileChunks = fileResult.chunks || [];


                // ==================================================
                // Detect programming language
                // ==================================================

                const language = detectLanguage(filePath);


                // ==================================================
                // Create ScanFile
                // ==================================================

                const scanFile =
                    await prisma.scanFile.create({
                        data: {
                            scanId: scan.id,
                            projectId: project.id,
                            filePath: filePath,
                            language: language,
                            fileSize: 0,
                        },
                    });


                console.log(
                    "ScanFile created:",
                    scanFile.id
                );


                // ==================================================
                // Save chunks
                // ==================================================

                for ( let chunkIndex = 0; chunkIndex < fileChunks.length; chunkIndex++ ) {

                    const chunk = fileChunks[chunkIndex];


                    // ----------------------------------------------
                    // Get embedding using global index
                    // ----------------------------------------------

                    const chunkEmbedding = embeddings[globalChunkIndex];


                    if (!chunkEmbedding) {

                        throw new ApiError(
                            500,
                            `Embedding not found for chunk ${globalChunkIndex}`
                        );
                    }


                    // ----------------------------------------------
                    // Convert embedding to pgvector format
                    // ----------------------------------------------

                    const vectorString = `[${chunkEmbedding.join(",")}]`;


                    // ----------------------------------------------
                    // Insert CodeChunk
                    // ----------------------------------------------

                    await prisma.$executeRaw`
                        INSERT INTO "CodeChunk"
                        (
                            "id",
                            "scanId",
                            "projectId",
                            "scanFileId",
                            "chunkIndex",
                            "content",
                            "language",
                            "embedding",
                            "createdAt"
                        )
                        VALUES
                        (
                            gen_random_uuid(),
                            ${scan.id},
                            ${project.id},
                            ${scanFile.id},
                            ${chunkIndex},
                            ${chunk},
                            ${language},
                            ${vectorString}::vector,
                            NOW()
                        )
                    `;


                    console.log(
                        `CodeChunk ${globalChunkIndex} saved`
                    );


                    globalChunkIndex++;
                }
            }


            // ====================================================
            // 14. Verify everything was processed
            // ====================================================

            if (
                globalChunkIndex !== allChunks.length
            ) {

                throw new ApiError(
                    500,
                    `Not all chunks were processed. Expected: ${allChunks.length}, Processed: ${globalChunkIndex}`
                );
            }


            // ====================================================
            // 15. Mark scan as completed
            // ====================================================

            await prisma.scan.update({
                where: {
                    id: scan.id,
                },

                data: {
                    status: "COMPLETED",
                    completedAt: new Date(),
                },
            });


            console.log(
                "=========================================="
            );

            console.log( "SCAN COMPLETED SUCCESSFULLY" );

            console.log("Scan ID:", scan.id);

            console.log(  "Files:", scanRepo.length );

            console.log( "Chunks:", allChunks.length );

            console.log(  "Embeddings:", embeddings.length );

            console.log( "==========================================" );


            // ====================================================
            // 16. Send response
            // ====================================================

            return res.status(200).json(
                new ApiResponse(
                    200,
                    {
                        cloneUrl,
                        repoPath,
                        userId,

                        projectId: project.id,
                        scanId: scan.id,

                        repositoryName,

                        filesProcessed:
                            scanRepo.length,

                        chunksProcessed:
                            allChunks.length,

                        embeddingsProcessed:
                            embeddings.length,
                    },

                    "Successfully processed repository"
                )
            );


        } catch (error) {

            // ====================================================
            // 17. Mark scan as FAILED
            // ====================================================

            console.error(
                "Repository processing failed:",
                error
            );


            try {

                await prisma.scan.update({
                    where: {
                        id: scan.id,
                    },

                    data: {
                        status: "FAILED",
                        completedAt: new Date(),
                    },
                });

            } catch (updateError) {

                console.error(
                    "Failed to update scan status:",
                    updateError
                );
            }


            // ====================================================
            // 18. Re-throw error
            // ====================================================

            throw error;
        }
    }
);


// ============================================================
// Language Detection
// ============================================================

function detectLanguage(
    filePath: string
): string {

    const extension =
        filePath
            .split(".")
            .pop()
            ?.toLowerCase();


    switch (extension) {

        case "js":
        case "jsx":
            return "javascript";

        case "ts":
        case "tsx":
            return "typescript";

        case "py":
            return "python";

        case "java":
            return "java";

        case "cpp":
        case "cc":
        case "cxx":
            return "cpp";

        case "c":
            return "c";

        case "cs":
            return "csharp";

        case "go":
            return "go";

        case "rs":
            return "rust";

        case "php":
            return "php";

        case "rb":
            return "ruby";

        case "kt":
            return "kotlin";

        case "swift":
            return "swift";

        case "sql":
            return "sql";

        case "html":
            return "html";

        case "css":
            return "css";

        case "scss":
            return "scss";

        case "json":
            return "json";

        case "yaml":
        case "yml":
            return "yaml";

        case "md":
            return "markdown";

        case "sh":
            return "shell";

        default:
            return "unknown";
    }
}


// ============================================================
// Export
// ============================================================

export {
    RepoRequest
};
