export const BackendRagService = async (
    queryVector: number[]
) => {
    const response = await fetch(
        "http://backend:4000/internal/rag/search",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: queryVector,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        console.error("Backend RAG error:", data);

        throw new Error(
            `Backend RAG search failed: ${response.status}`
        );
    }

    return data;
};