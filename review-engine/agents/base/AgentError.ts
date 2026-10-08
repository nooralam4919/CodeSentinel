export class AgentError extends Error {
    constructor(
        public readonly agentName: string,
        message: string,
        public readonly cause?: unknown
    ) {
        super(`[${agentName}] ${message}`);
        this.name = "AgentError";
    }
}
