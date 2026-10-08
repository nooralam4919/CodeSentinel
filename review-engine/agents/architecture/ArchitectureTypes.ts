export type ArchitecturePattern =
    | "MVC" | "Layered" | "Microservices" | "Monolith"
    | "CQRS" | "Event-Driven" | "Hexagonal" | "Unknown";

export interface ArchitectureIssue {
    severity: "HIGH" | "MEDIUM" | "LOW";
    title: string;
    location?: string;
    description: string;
    recommendation: string;
}

export interface ArchitectureReport {
    pattern: ArchitecturePattern;
    summary: string;
    strengths: string[];
    issues: ArchitectureIssue[];
    recommendations: string[];
}
