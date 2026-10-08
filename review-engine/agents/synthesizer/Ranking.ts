import { AgentResult } from "../base/AgentResult.js";

const SEVERITY_WEIGHT: Record<string, number> = {
    CRITICAL: 5,
    HIGH:     4,
    MEDIUM:   3,
    LOW:      2,
    INFO:     1,
};

// Returns agent results sorted by their highest severity finding (most critical first).
export function rankResults(results: AgentResult[]): AgentResult[] {
    return [...results].sort((a, b) => {
        const scoreA = Math.max(
            0,
            ...(a.findings ?? []).map((f) => SEVERITY_WEIGHT[f.severity] ?? 0)
        );
        const scoreB = Math.max(
            0,
            ...(b.findings ?? []).map((f) => SEVERITY_WEIGHT[f.severity] ?? 0)
        );
        return scoreB - scoreA;
    });
}
