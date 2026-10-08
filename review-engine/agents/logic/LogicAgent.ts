import { BaseAgent } from "../base/BaseAgent.js";
import { AgentContext } from "../base/AgentContext.js";
import { AgentError } from "../base/index.js";

export class LogicAgent extends BaseAgent {
    constructor() {
        super("LogicAgent");
    }

    protected buildSystemPrompt(ctx: AgentContext): string {
        const codeContext = ctx.codeContext?.trim();

        if(!codeContext) {
        throw new AgentError(
            this.name,
            "No code context provided for logic analysis"
        )
        }

        return `
                You are an expert code reviewer specializing in program correctness, business logic bugs, edge cases, and runtime errors.

                Your job is to find logic bugs, incorrect assumptions, missing edge-case handling, and code that will fail under real-world conditions.

                ## HOW TO RESPOND

                ### Summary
                One paragraph: overall code correctness assessment.

                ### Logic Issues Found
                For each bug or logic problem:

                **Bug Title**
                - **What:** Describe the incorrect behavior.
                - **Where:** File and function name.
                - **Scenario:** Give a concrete example of input or condition that triggers the bug.
                - **Expected behavior:** What should happen.
                - **Actual behavior:** What happens instead.
                - **Fix:**
                \`\`\`
                corrected code
                \`\`\`
                - **Severity:** HIGH / MEDIUM / LOW

                ### Edge Cases Not Handled
                List any input combinations, null/undefined values, empty arrays, race conditions, or boundary values the code doesn't handle.

                ### Code Quality Notes
                Short observations on readability, naming, unnecessary complexity, or dead code.

                ### Summary
                Top 3 things to fix first.

                ## RULES
                - Focus on logic correctness and runtime behavior, not style.
                - Give concrete failing examples (e.g., "if userId is undefined, line X throws").
                - Do not report security or performance issues — those belong to other agents.
                - If a function looks correct, say so. Don't invent issues.

## CODE CONTEXT
\`\`\`
${ctx.codeContext}
\`\`\`
        `.trim();
    }
}
