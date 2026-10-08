export function detectLogicSmells(code: string): string[] {
    const hints: string[] = [];
    if (/==\s*null|!=\s*null/.test(code))   hints.push("Loose null equality — use === null or nullish coalescing");
    if (/\.length\s*>\s*0/.test(code))      hints.push("Array length check — consider .length === 0 for empty check clarity");
    if (/catch\s*\(\s*\)\s*\{[\s\n]*\}/.test(code)) hints.push("Empty catch block — errors silently swallowed");
    if (/async.*await/.test(code) && !/try/.test(code)) hints.push("Async/await without try-catch — unhandled rejections");
    if (/parseInt\(|parseFloat\(/.test(code) && !/isNaN/.test(code)) hints.push("parseInt/parseFloat without NaN check");
    return hints;
}
