import { PlannerDecision, AgentType } from "./PlannerTypes.js";

// Keyword-based fast routing — used as fallback if LLM planner fails.
export function fastRoute(question: string): PlannerDecision {
    const q = question.toLowerCase();

    const SECURITY_KEYWORDS    = ["security", "vulnerability", "vuln", "injection", "xss", "csrf", "auth", "token", "password", "secret", "exploit", "owasp", "attack"];
    const ARCHITECTURE_KEYWORDS = ["architecture", "structure", "design", "pattern", "solid", "coupling", "refactor", "folder", "organization", "layer", "module"];
    const PERFORMANCE_KEYWORDS  = ["slow", "performance", "optimize", "bottleneck", "memory", "leak", "cache", "query", "n+1", "latency", "timeout", "speed"];
    const TESTING_KEYWORDS      = ["test", "coverage", "unit test", "integration", "mock", "spec", "jest", "vitest", "pytest"];
    const LOGIC_KEYWORDS        = ["bug", "error", "broken", "wrong", "incorrect", "logic", "edge case", "null", "undefined", "crash", "fail"];
    const FULL_KEYWORDS         = ["review everything", "full review", "full audit", "analyze all", "complete review"];

    if (FULL_KEYWORDS.some((k) => q.includes(k)))
        return { agents: ["security", "architecture", "logic", "performance", "testing"], mode: "full", reasoning: "Full review requested" };

    const matched: AgentType[] = [];
    if (SECURITY_KEYWORDS.some((k) => q.includes(k)))    matched.push("security");
    if (ARCHITECTURE_KEYWORDS.some((k) => q.includes(k))) matched.push("architecture");
    if (PERFORMANCE_KEYWORDS.some((k) => q.includes(k))) matched.push("performance");
    if (TESTING_KEYWORDS.some((k) => q.includes(k)))     matched.push("testing");
    if (LOGIC_KEYWORDS.some((k) => q.includes(k)))       matched.push("logic");

    if (matched.length === 0)
        return { agents: ["logic"], mode: "single", reasoning: "General question — logic agent handles explanation" };

    if (matched.length === 1)
        return { agents: matched, mode: "single", reasoning: `Routed to ${matched[0]} based on keywords` };

    return { agents: matched.slice(0, 3), mode: "multi", reasoning: `Multiple concerns detected: ${matched.join(", ")}` };
}
