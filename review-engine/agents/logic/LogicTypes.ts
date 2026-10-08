export interface LogicIssue {
    severity: "HIGH" | "MEDIUM" | "LOW";
    title: string;
    file?: string;
    description: string;
    scenario: string;
    fix: string;
}

export interface LogicReport {
    summary: string;
    issues: LogicIssue[];
    edgeCases: string[];
    recommendations: string[];
}
