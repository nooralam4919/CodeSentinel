// Calls the multi-agent review endpoint.
// Returns structured output: answer (markdown), agentsUsed, severity, plannerMode.
export async function submitMultiAgentReview(
    question: string,
    projectId?: string
): Promise<{
    answer:        string;
    agentsUsed:    string[];
    plannerMode:   "single" | "multi" | "full" | "none";
    plannerReason: string;
    severity: {
        overall:  string;
        critical: number;
        high:     number;
        medium:   number;
        low:      number;
        info:     number;
    };
}> {
    const response = await fetch(
        "http://localhost:4000/api/v1/review/multi",
        {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                question,
                ...(projectId ? { projectId } : {}),
            }),
        }
    );

    const data = await response.json();

    if (!response.ok)
        throw new Error(data.message ?? "Multi-agent review failed");

    // Backend wraps in ApiResponse — unwrap
    return data.data ?? data;
}
