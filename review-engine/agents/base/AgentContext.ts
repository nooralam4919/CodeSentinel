// The input context passed to every agent.
export interface AgentContext {
    // The user's original question
    question: string;

    // Top-N relevant code chunks retrieved from the vector database
    codeContext: string;

    // Which project these chunks belong to (for reference in responses)
    projectId?: string;
}
