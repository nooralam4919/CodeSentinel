export function detectPerformanceSmells(code: string): string[] {
    const hints: string[] = [];
    if (/for.*await|await.*for.*of/.test(code))     hints.push("Sequential awaits in loop — use Promise.all for parallelism");
    if (/\.filter\(.*\)\.map\(|\.map\(.*\)\.filter\(/.test(code)) hints.push("Chained filter+map — can be combined into one pass with reduce");
    if (/prisma\.\w+\.findMany.*for|for.*prisma\.\w+\.find/.test(code)) hints.push("Possible N+1 query — DB call inside loop");
    if (/JSON\.parse\(JSON\.stringify/.test(code))  hints.push("Deep clone via JSON.parse/stringify — use structuredClone()");
    if (/\.sort\(.*\)/.test(code))                  hints.push("Array sort — check if called on large arrays in hot path");
    return hints;
}
