import { AgentResult } from "../base/AgentResult.js";

export interface SeveritySummary {
    critical: number;
    high:     number;
    medium:   number;
    low:      number;
    info:     number;
    overall:  string;
}

export function calculateSeverity(results: AgentResult[]): SeveritySummary {
    const counts = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };

    for (const result of results) {
        for (const finding of result.findings ?? []) {
            const key = finding.severity.toLowerCase() as keyof typeof counts;
            if (key in counts) counts[key]++;
        }
    }

    let overall = "CLEAN";
    if (counts.critical > 0)        overall = "CRITICAL";
    else if (counts.high > 0)       overall = "HIGH";
    else if (counts.medium > 0)     overall = "MEDIUM";
    else if (counts.low > 0)        overall = "LOW";

    return { ...counts, overall };
}
