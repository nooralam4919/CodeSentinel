import prisma from "../lib/prisma.js";

type VectorSearchResult = {
    id: number;
    content: string;
    distance: number;
};

export const vectorSearch = async (
    queryVector: number[],
    limit: number = 5
) => {
    const vector = `[${queryVector.join(",")}]`;

    const results = await prisma.$queryRaw<VectorSearchResult[]>`
        SELECT
            id,
            content,
            embedding <=> ${vector}::vector AS distance
        FROM "CodeChunk"
        WHERE embedding IS NOT NULL
        ORDER BY embedding <=> ${vector}::vector
        LIMIT ${limit};
    `;

    return results;
};