// The output every agent must return.
export interface AgentResult {
    // Which agent produced this result
    agent: string;

    // The markdown-formatted answer
    answer: string;

    // Confidence 0–1 that this agent was the right one for the question
    confidence: number;

    // Optional: structured findings (security agent populates this)
    findings?: Finding[];

    // Whether the agent used Tavily web search
    usedWebSearch: boolean;
}

export interface Finding {
    severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";
    title: string;
    file?: string;
    line?: number;
    description: string;
    recommendation: string;
}
