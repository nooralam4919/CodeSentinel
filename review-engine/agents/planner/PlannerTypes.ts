export type AgentType =
    | "security"
    | "architecture"
    | "logic"
    | "performance"
    | "testing"
    | "general";

export interface PlannerDecision {
    // Which agents to run (ordered by priority)
    agents: AgentType[];
    // Why these agents were chosen
    reasoning: string;
    // Whether to run a full multi-agent review or just one specialist
    mode: "single" | "multi" | "full";
}
