import { AgentResult } from "../base/AgentResult.js";

// Combines multiple agent results into a single context string for the Synthesizer.
export function mergeResults(results: AgentResult[]): string {
    return results
        .map((r) => `### ${r.agent}\n\n${r.answer}`)
        .join("\n\n---\n\n");
}

// Returns the highest severity found across all agent results.
export function highestSeverity(results: AgentResult[]): string {
    const order = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"];
    const found = results.flatMap((r) => r.findings ?? []).map((f) => f.severity);
    for (const level of order) {
        if (found.includes(level as any)) return level;
    }
    return "INFO";
}
