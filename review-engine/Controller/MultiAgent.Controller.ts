import { Request, Response } from "express";
import { PlannerAgent }       from "../agents/planner/PlannerAgent.js";
import { AgentType }          from "../agents/planner/PlannerTypes.js";
import { SecurityAgent }      from "../agents/security/SecurityAgent.js";
import { ArchitectureAgent }  from "../agents/architecture/ArchitectureAgent.js";
import { LogicAgent }         from "../agents/logic/LogicAgent.js";
import { PerformanceAgent }   from "../agents/performance/PerformanceAgent.js";
import { TestingAgent }       from "../agents/testing/TestingAgent.js";
import { SynthesizerAgent }   from "../agents/synthesizer/SynthesizerAgent.js";
import { AgentContext }       from "../agents/base/AgentContext.js";
import { AgentResult }        from "../agents/base/AgentResult.js";
import { calculateSeverity }  from "../agents/synthesizer/SeverityCalculator.js";

// ── Agent registry ────
// Agents are instantiated once (singleton per process).

const AGENT_REGISTRY: Record<AgentType, () => any> = {
    security:     () => new SecurityAgent(),
    architecture: () => new ArchitectureAgent(),
    logic:        () => new LogicAgent(),
    performance:  () => new PerformanceAgent(),
    testing:      () => new TestingAgent(),
    general:      () => new LogicAgent(),   // general questions → logic agent
};

//  Multi-agent orchestrator controller ─────────(**()((((((((───────────────────────────
//
// Flow:
//   1. Planner decides which agents to run
//   2. Specialist agents run in parallel
//   3. If multiple agents ran → Synthesizer merges into one final answer
//   4. Return structured result to the backend

export const MultiAgentController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { question, context } = req.body as {
            question: string;
            context:  string;
        };

        if (!question || !context) {
            res.status(400).json({
                message: "question and context are required",
            });
            return;
        }

        console.log("[MultiAgent] Question:", question);

        // ── Step 1: Planner routes the question ───────────────
        const planner  = new PlannerAgent();
        const decision = await planner.plan(question);

        console.log("[MultiAgent] Decision:", decision);

        const agentCtx: AgentContext = { question, codeContext: context };

        // ── Step 2: run specialist agents in parallel ─────────
        const agentNames = decision.agents as AgentType[];

        // Use allSettled so one failing agent doesn't kill the whole review
        const settled = await Promise.allSettled(
            agentNames.map((name) => {
                const agent = AGENT_REGISTRY[name]?.();
                if (!agent) {
                    return Promise.resolve<AgentResult>({
                        agent: name,
                        answer: `Agent "${name}" is not available.`,
                        confidence: 0,
                        usedWebSearch: false,
                    });
                }
                return agent.run(agentCtx) as Promise<AgentResult>;
            })
        );

        // Collect successful results; log failures but continue *************************
        const agentResults: AgentResult[] = settled
            .map((r, i) => {
                if (r.status === "fulfilled") return r.value;
                console.error(`[MultiAgent] ${agentNames[i]} failed:`, r.reason?.message ?? r.reason);
                return {
                    agent: agentNames[i],
                    answer: `The ${agentNames[i]} encountered an error and could not complete its analysis.`,
                    confidence: 0,
                    usedWebSearch: false,
                } as AgentResult;
            });

        console.log(
            "[MultiAgent] Agents completed:",
            agentResults.map((r) => r.agent).join(", ")
        );

        // ── Step 3: Synthesize if multiple agents ran       **─────────
        let finalAnswer: string;
        let agentsUsed: string[];

        if (agentResults.length === 1) {
            // Single agent — return its answer directly
            finalAnswer = agentResults[0].answer;
            agentsUsed  = [agentResults[0].agent];
        } else {
            // Multiple agents — synthesize into one coherent report
            const synthesizer = new SynthesizerAgent();
            const synthesis   = await synthesizer.synthesize(
                question,
                agentResults,
                context
            );
            finalAnswer = synthesis.answer;
            agentsUsed  = agentResults.map((r) => r.agent);
        }

        // ── Step 4: Calculate overall severity from all findings
        const severity = calculateSeverity(agentResults);

        res.status(200).json({
            answer:       finalAnswer,
            agentsUsed,
            plannerMode:  decision.mode,
            plannerReason: decision.reasoning,
            severity,
        });

    } catch (error: any) {
        console.error("[MultiAgent] Error:", error);

        res.status(500).json({
            message: error?.message ?? "Multi-agent review failed",
        });
    }
};
