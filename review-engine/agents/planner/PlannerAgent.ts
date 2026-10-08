import { ChatGroq } from "@langchain/groq";
import { PlannerDecision } from "./PlannerTypes.js";
import { PLANNER_SYSTEM_PROMPT } from "./PlannerPrompt.js";
import { fastRoute } from "./PlannerService.js";

export class PlannerAgent {
    private readonly llm: any;

    constructor() {
        const groqKey = process.env.GROQ_API_KEY;
        if (!groqKey) throw new Error("GROQ_API_KEY is not set");

        // Planner uses a lighter, faster model — it just needs to classify intent
        this.llm = new ChatGroq({
            apiKey: groqKey,
            model:  "openai/gpt-oss-120b",
            temperature: 0,
        });
    }

    async plan(question: string): Promise<PlannerDecision> {
        try {
            const response = await this.llm.invoke([
                { role: "system", content: PLANNER_SYSTEM_PROMPT },
                { role: "user",   content: `Route this question: "${question}"` },
            ]);

            const content = typeof response.content === "string"
                ? response.content
                : JSON.stringify(response.content);


            // Strip markdown code fences if LLM wraps the JSON
            const jsonStr = content
                .replace(/```json\n?/g, "")
                .replace(/```\n?/g, "")
                .trim();

            const decision = JSON.parse(jsonStr) as PlannerDecision;

            // Validate the response structure
            if (!Array.isArray(decision.agents) || !decision.mode) {
                throw new Error("Invalid planner response structure");
            }

            return decision;

        } catch {
            // If LLM planner fails, fall back to keyword routing
            console.warn("[PlannerAgent] LLM routing failed, using fast keyword routing");
            return fastRoute(question);
        }
    }
}
