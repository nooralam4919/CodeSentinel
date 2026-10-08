export function detectPattern(code: string): string {
    if (code.includes("controller") && code.includes("service") && code.includes("route"))
        return "MVC / Layered";
    if (code.includes("event") && code.includes("emit"))
        return "Event-Driven";
    if (code.includes("Repository") || code.includes("repository"))
        return "Repository Pattern detected";
    return "Pattern unclear from context";
}
