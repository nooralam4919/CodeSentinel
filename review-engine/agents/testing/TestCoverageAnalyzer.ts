export function estimateCoverage(code: string): {
    hasTests: boolean;
    hints: string[];
} {
    const hasTests = /describe\(|it\(|test\(|\.spec\.|\.test\./.test(code);
    const hints: string[] = [];

    if (!hasTests) hints.push("No test files detected in the provided context");

    const fnCount = (code.match(/function\s+\w+|const\s+\w+\s*=.*=>/g) ?? []).length;
    if (fnCount > 5 && !hasTests) hints.push(`Detected ~${fnCount} functions with no apparent test coverage`);

    if (/async\s+function|async\s*\(/.test(code) && !hasTests)
        hints.push("Async functions present — integration tests are especially important");

    if (/prisma\.|mongoose\.|sequelize\./.test(code) && !hasTests)
        hints.push("Database access detected — mock the DB client in unit tests");

    return { hasTests, hints };
}
