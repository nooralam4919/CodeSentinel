import { BaseAgent } from "../base/BaseAgent.js";
import { AgentContext } from "../base/AgentContext.js";
import { AgentResult, Finding } from "../base/AgentResult.js";

// The Synthesizer receives results from multiple specialist agents
// and produces a single, coherent, prioritized report for the user.
export class SynthesizerAgent extends BaseAgent {
    constructor() {
        super("SynthesizerAgent");
    }

    protected buildSystemPrompt(ctx: AgentContext): string {
    
        return `
                You are a senior engineering lead writing an executive code review summary.

                You will receive analysis from multiple specialist agents. Your job is to:
                1. Remove duplicates and contradictions
                2. Prioritize findings by business impact
                3. Write a clear, actionable final report the developer can act on immediately

                ## OUTPUT FORMAT

                ### Overall Assessment
                **Risk Level:** CRITICAL / HIGH / MEDIUM / LOW / CLEAN
                One paragraph: the state of the codebase in plain English.

                ### Priority Issues (Top 5 max)
                Ranked by impact. For each:

                **#N — [Issue Title]** · *[Agent: Security / Architecture / Logic / Performance / Testing]*
                - **Summary:** One sentence.
                - **Why urgent:** Business impact.
                - **Action:** What to do right now.

                ### What's Working Well
                Bullet list of genuine strengths (keep it honest — skip this section if there are no real strengths).

                ### Recommended Action Plan
                1. Fix immediately (this sprint)
                2. Fix soon (next sprint)
                3. Address in upcoming refactor

                ### Quick Summary
                One sentence a non-technical person could understand.

                ## RULES
                - Be honest. Don't pad with generic advice.
                - If agents found nothing — say the code looks good and why.
                - Merge duplicate findings from different agents into one entry.
                - Write for the developer, not for a report. Plain language.
                - Never fabricate findings not present in the agent outputs.
        `.trim();
    }

    // export interface AgentResult {
    //     // Which agent produced this result
    //     agent: string;
    
    //     // The markdown-formatted answer
    //     answer: string;
    
    //     // Confidence 0–1 that this agent was the right one for the question
    //     confidence: number;
    
    //     // Optional: structured findings (security agent populates this)
    //     findings?: Finding[];
    
    //     // Whether the agent used Tavily web search
    //     usedWebSearch: boolean;
    // }
    

    // Takes multiple agent results as context input
    async synthesize( question: string, agentResults: AgentResult[],
        codeContext: string
    ): Promise<AgentResult> {
        // Build a combined context from all agent answers
        const combinedContext = agentResults
            .map((r) => `## ${r.agent} Analysis\n\n${r.answer}`)
            .join("\n\n---\n\n");

        const ctx: AgentContext = {
            question,
            codeContext: `${codeContext}\n\n---\n\n## Agent Analyses\n\n${combinedContext}`,
        };

        return this.run(ctx);
    }
}
