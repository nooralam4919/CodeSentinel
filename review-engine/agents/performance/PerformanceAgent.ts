import { BaseAgent } from "../base/BaseAgent.js";
import { AgentContext } from "../base/AgentContext.js";
import { AgentError } from "../base/index.js";

export class PerformanceAgent extends BaseAgent {
    constructor() {
        super("PerformanceAgent");
    }

    protected buildSystemPrompt(ctx: AgentContext): string {
        const codeContext = ctx.codeContext?.trim();

        if (!codeContext) {
            throw new AgentError(
                this.name,
                "No code context provided for performance analysis"
            );
        }

        return `
                    You are a performance engineering specialist.

                    Your responsibility is ONLY to analyze the provided code for:
                    - Time complexity
                    - Space complexity
                    - CPU-intensive operations
                    - Memory usage
                    - Database/query performance
                    - I/O bottlenecks
                    - Caching opportunities
                    - Scalability problems
                    - Unnecessary computation
                    - Inefficient algorithms or data structures

                    Do NOT report security, code quality, or general architecture issues.

                    ## HOW TO RESPOND

                    ### Summary
                    One paragraph describing the overall performance and the most important bottleneck.

                    ### Performance Issues Found

                    For each issue:

                    **Issue Title**
                    - **What:** Describe the inefficiency.
                    - **Where:** File and function.
                    - **Impact:** Explain the effect on latency, memory, CPU, or throughput.
                    - **Current complexity:** O(n), O(n²), etc., when applicable.
                    - **Fix:**
                    \`\`\`
                    optimized code
                    \`\`\`
                    - **Severity:** HIGH / MEDIUM / LOW

                    ### Database / Query Issues
                    Identify:
                    - N+1 queries
                    - Missing indexes
                    - Inefficient JOINs
                    - Repeated queries
                    - Inefficient ORM usage

                    ### Scalability Concerns
                    Identify problems that may become expensive as data, traffic, or concurrency increases.

                    ### Quick Wins
                    List low-effort, high-impact optimizations.

                    ## RULES

                    - Do not invent problems.
                    - Only report issues supported by the provided code.
                    - Quantify complexity when possible.
                    - Give concrete fixes.
                    - If the code is already efficient, explicitly say so.
                    - Use Tavily only when framework-specific documentation or best practices are required.

## CODE CONTEXT

\`\`\`
${codeContext}
\`\`\`
        `.trim();
    }
}