// Pattern hints the security agent checks for.
// These are injected as additional context when relevant.
export const SECURITY_RULES = [
    "SQL Injection: raw string concatenation in DB queries",
    "XSS: unescaped user input rendered in HTML",
    "Hardcoded credentials: API keys, passwords, tokens in source",
    "Insecure JWT: weak secrets, missing expiry, algorithm confusion",
    "IDOR: missing ownership checks on resource access",
    "SSRF: unvalidated URLs in server-side fetch calls",
    "Path traversal: user-controlled file paths",
    "Mass assignment: unfiltered req.body directly into DB",
    "Missing auth middleware on sensitive routes",
    "Sensitive data in logs or error messages",
    "Eval/exec with user input",
    "Prototype pollution in JavaScript/TypeScript",
    "Dependency confusion or typosquatting in package.json",
    "Missing CORS restrictions",
    "Cleartext secrets in environment variable names exposed to client",
] as const;
