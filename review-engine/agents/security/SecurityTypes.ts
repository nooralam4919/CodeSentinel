export type SecuritySeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";

export interface SecurityFinding {
    severity: SecuritySeverity;
    title: string;
    file?: string;
    line?: number;
    codeSnippet?: string;
    description: string;
    recommendation: string;
    cveId?: string;
}

export interface SecurityReport {
    overallRisk: SecuritySeverity;
    summary: string;
    findings: SecurityFinding[];
    recommendations: string[];
}
