// Lightweight static pre-scan that looks for obvious patterns before the LLM runs.
// Returns a list of hints injected into the context to guide the LLM.
export function preAnalyze(code: string): string[] {
    const hints: string[] = [];
    if (/SELECT.*\+.*req\.|query\(.*\$\{/.test(code))     hints.push("Possible SQL injection — string interpolation in query");
    if (/console\.log.*password|console\.log.*token/i.test(code)) hints.push("Sensitive data may be logged");
    if (/process\.env\.[A-Z_]*SECRET|process\.env\.[A-Z_]*KEY/.test(code)) hints.push("Environment secret referenced — check if exposed to client");
    if (/eval\(|new Function\(/.test(code))               hints.push("eval() or new Function() detected");
    if (/hardcoded|password\s*=\s*['"]/i.test(code))      hints.push("Possible hardcoded credential");
    if (/\.cookie\(|res\.cookie/.test(code) && !code.includes("httpOnly")) hints.push("Cookie set without httpOnly flag");
    if (/fetch\(req\.|axios\.get\(req\./.test(code))       hints.push("Possible SSRF — URL from request used in server-side fetch");
    return hints;
}
