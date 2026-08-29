import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynHandle.js";
import { Request, Response } from "express";
import { cloneRepository } from "../utils/cloneRepository.js";
import { scanRepository } from "../utils/scanRepository.js";
import { Chunking } from "../services/Chunking.service.js";
import { EmbeddingService } from "../services/Embedding.service.js";
import prisma from "../lib/prisma.js";

const RepoRequest = asyncHandler(
    async (req: Request, res: Response) => {

        const { cloneUrl } = req.body;
        const userId = req.userId;

        if (!cloneUrl) {
            throw new ApiError(400, "cloneUrl is not found");
        }

        if (!userId) {
            throw new ApiError(400, "user is not found");
        }

        const repositoryName = cloneUrl
            .split("/")
            .pop()
            ?.replace(".git", "");

        // ============================================================
        // Find existing project
        // ============================================================

        let project = await prisma.project.findFirst({
            where: {
                ownerId: userId,
                repositoryUrl: cloneUrl
            }
        });

        // ============================================================
        // Create project if it does not exist
        // ============================================================

        if (!project) {
            project = await prisma.project.create({
                data: {
                    name: repositoryName || "unnamed project",
                    repositoryUrl: cloneUrl,
                    repositoryName: repositoryName,
                    ownerId: userId
                }
            });
        }

        console.log("Repository URL:", cloneUrl);
        console.log("Project ID:", project.id);

        // ============================================================
        // Create scan
        // ============================================================

        const scan = await prisma.scan.create({
            data: {
                projectId: project.id,
                userId: userId,
                type: "MANUAL",
                status: "RUNNING"
            }
        });

        console.log("Scan created:", scan.id);

        // ============================================================
        // 1. Clone repository
        // ============================================================

        const repoPath = await cloneRepository(cloneUrl);

        console.log(
            "This is my repo clone:",
            repoPath
        );

        // ============================================================
        // 2. Scan repository
        // ============================================================

        const scanRepo = await scanRepository(repoPath);

        console.log(
            "Number of files:",
            scanRepo.length
        );

        console.log(
            "Scanned files:",
            scanRepo
        );

        // Update total files
        await prisma.scan.update({
            where: {
                id: scan.id
            },
            data: {
                totalFiles: scanRepo.length,
                scannedFiles: scanRepo.length
            }
        });

        // ============================================================
        // 3. Chunk documents
        // ============================================================

        const chunkingAPItoRevieEngi = await Chunking(scanRepo);

        console.log(
            "Chunking response:",
            chunkingAPItoRevieEngi
        );

        // ============================================================
        // 4. Extract chunks
        // ============================================================

        const allChunks = chunkingAPItoRevieEngi.flatMap(
            (file) => file.chunks
        );

        console.log(
            "Total chunks:",
            allChunks.length
        );

        // ============================================================
        // 5. Generate embeddings
        // ============================================================

        const embedding = await EmbeddingService(allChunks);

        console.log(
            "Embedding generated successfully"
        );

        console.log(
            "Number of embeddings:",
            embedding.length
        );

        // ============================================================
        // Pushing into database
        //
        // Think about it as:
        //
        // Who owns this repository?
        //        ↓
        // Which repository?
        //        ↓
        // Which scan?
        //        ↓
        // Which files?
        //        ↓
        // Which chunks?
        //        ↓
        // Which embeddings?
        //        ↓
        // Which security findings?
        // ============================================================

        // ============================================================
        // Create ScanFile + CodeChunk
        // ============================================================

        for (let i = 0; i < scanRepo.length; i++) {

            const filePath = scanRepo[i];

            console.log(
                "Processing file:",
                filePath
            );

            // --------------------------------------------------------
            // Create ScanFile
            // --------------------------------------------------------

            const scanFile = await prisma.scanFile.create({
                data: {
                    scanId: scan.id,
                    projectId: project.id,
                    filePath: filePath,
                    language: "javascript",
                    fileSize: 0
                }
            });

            console.log(
                "ScanFile created:",
                scanFile.id
            );

            // --------------------------------------------------------
            // Get chunks belonging to this file
            // --------------------------------------------------------

            const fileResult = chunkingAPItoRevieEngi[i];

            if (!fileResult) {
                continue;
            }

            const fileChunks = fileResult.chunks;

            // --------------------------------------------------------
            // Create CodeChunk records
            // --------------------------------------------------------

            for (let chunkIndex = 0; chunkIndex < fileChunks.length; chunkIndex++) {

                const chunk = fileChunks[chunkIndex];

                // Find corresponding embedding
                const embeddingIndex = allChunks.indexOf(chunk);

                const chunkEmbedding = embedding[embeddingIndex];

                if (!chunkEmbedding) {
                    console.log(
                        "Embedding not found for chunk:",
                        chunkIndex
                    );

                    continue;
                }

                // Convert embedding array into PostgreSQL vector
                const vectorString = `[${chunkEmbedding.join(",")}]`;

                // ----------------------------------------------------
                // Create CodeChunk
                // ----------------------------------------------------

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
                        ${"javascript"},
                        ${vectorString}::vector,
                        NOW()
                    )
                `;

                console.log(
                    `CodeChunk ${chunkIndex} saved`
                );
            }
        }

        // ============================================================
        // Mark scan as completed
        // ============================================================

        await prisma.scan.update({
            where: {
                id: scan.id
            },
            data: {
                status: "COMPLETED",
                completedAt: new Date()
            }
        });

        // ============================================================
        // 6. Send response
        // ============================================================

        res.status(200).json(
            new ApiResponse(
                200,
                {
                    cloneUrl,
                    repoPath,
                    userId,
                    projectId: project.id,
                    scanId: scan.id,
                    repositoryName,
                    filesProcessed: scanRepo.length,
                    chunksProcessed: allChunks.length,
                    embeddingsProcessed: embedding.length
                },
                "Successfully processed repository"
            )
        );
    }
);

export {
    RepoRequest
};












                         
                         
//                          GitHub Repository
//                                 ↓
//                          Clone
//                                 ↓
//                          Scan files
//                                 ↓
//                          Chunk files
//                                 ↓
//                          Generate embeddings
//                                 ↓
//                          Create Project
//                                 ↓
//                          Create Scan
//                                 ↓
//                          Create ScanFile
//                                 ↓
//                          Create CodeChunk
//                                 ↓
//                          Save embedding vector
//                                 ↓
//                          PostgreSQL + pgvector

