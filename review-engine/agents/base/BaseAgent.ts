import { ChatGroq } from "@langchain/groq";
import { TavilySearch } from "@langchain/tavily";
import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { AgentContext } from "./AgentContext.js";
import { AgentResult } from "./AgentResult.js";
import { AgentError } from "./AgentError.js";

export abstract class BaseAgent {
    protected readonly name: string;
    protected readonly llm: any;

    private readonly graph: any;
    constructor(name: string) {
        this.name = name;

        const groqKey   = process.env.GROQ_API_KEY;
        const tavilyKey = process.env.TAVILY_API_KEY;

        if (!groqKey) throw new AgentError(name, "GROQ_API_KEY is not set");

        // Tavily is optional — agents work without web search
        const tools: any[] = [];

        if (tavilyKey) {
            try {
                const tavilyTool = new TavilySearch({
                    tavilyApiKey: tavilyKey,
                    maxResults: 3,
                    topic: "general",
                });
                tools.push(tavilyTool);
            } catch {
                console.warn(`[${name}] Tavily init failed — running without web search`);
            }
        }

        // Bind tools only if any are available
        const baseLLM = new ChatGroq({
            apiKey: groqKey,
            model: "openai/gpt-oss-120b",
            temperature: 0.3,
        });

        this.llm = tools.length > 0 ? baseLLM.bindTools(tools) : baseLLM;

        const agentNode = async (state: any) => {
            const response = await this.llm.invoke(state.messages);
            return { messages: [response] };
        };

        if (tools.length > 0) {
            // Full agentic graph with tool calling
            const toolNode = new ToolNode(tools);
            const edge = (state: any) => {
                const last = state.messages.at(-1);
                return last?.tool_calls?.length ? "tools" : "__end__";
            };
            this.graph = new StateGraph(MessagesAnnotation)
                .addNode("agent", agentNode)
                .addNode("tools", toolNode)
                .addEdge("__start__", "agent")
                .addEdge("tools", "agent")
                .addConditionalEdges("agent", edge)
                .compile();
        } else {
            // Simple single-step graph — no tools
            this.graph = new StateGraph(MessagesAnnotation)
                .addNode("agent", agentNode)
                .addEdge("__start__", "agent")
                .compile();
        }
    }

    protected abstract buildSystemPrompt(ctx: AgentContext): string;

    protected processAnswer(raw: string, _ctx: AgentContext): string {
        return raw;
    }

    async run(ctx: AgentContext): Promise<AgentResult> {
        try {
            const systemPrompt = this.buildSystemPrompt(ctx);

            const result = await this.graph.invoke({
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user",   content: ctx.question  },
                ],
            });

            const lastMessage = result.messages.at(-1);
            const rawAnswer   = typeof lastMessage?.content === "string"
                ? lastMessage.content
                : JSON.stringify(lastMessage?.content ?? "");

            const usedWebSearch = result.messages.some(
                (m: any) => m.name === "tavily_search_results_json"
            );

            return {
                agent:        this.name,
                answer:       this.processAnswer(rawAnswer, ctx),
                confidence:   1.0,
                usedWebSearch,
            };

        } catch (err) {
            const cause = err instanceof Error ? err.message : String(err);
            console.error(`[${this.name}] Error:`, cause);
            throw new AgentError(this.name, `Agent execution failed: ${cause}`, err);
        }
    }
}
