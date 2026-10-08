const ApiCallforSubmittingQuary = async (quary: string, projectId?: string) => {
    const response = await fetch(
        "http://localhost:4000/api/v1/agentreview/query",
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: quary,
                // Scope the vector search to this project only.
                // Prevents answers from bleeding across different scanned repos.
                ...(projectId ? { projectId } : {}),
            }),
        }
    );

    const data = await response.json();

    if (!response.ok)
        throw new Error(data.message || "Failed to get review response");

    return data;
};

export { ApiCallforSubmittingQuary };
