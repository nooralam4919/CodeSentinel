export interface PerformanceIssue {
    severity: "HIGH" | "MEDIUM" | "LOW";
    title: string;
    file?: string;
    currentComplexity?: string;
    description: string;
    impact: string;
    fix: string;
}

export interface PerformanceReport {
    summary: string;
    issues: PerformanceIssue[];
    quickWins: string[];
    scalabilityConcerns: string[];
}
