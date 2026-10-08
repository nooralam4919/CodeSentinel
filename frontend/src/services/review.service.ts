import { apiFetch } from "./api";

// Submit a review question through the RAG pipeline.
// Returns the LLM-generated answer from the backend.
export async function submitReviewQuestion(question: string) {
    const data = await apiFetch("/api/v1/agentreview/query", {
        method: "POST",
        body: { question },
    });
    return data as { statusCode: number; data: { answer: string }; message: string };
}
