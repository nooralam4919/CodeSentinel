export const TESTING_PRINCIPLES = [
    "Test behavior, not implementation",
    "Each test should have exactly one reason to fail",
    "Use AAA pattern: Arrange, Act, Assert",
    "Mock external dependencies (DB, HTTP, filesystem)",
    "Test happy path AND edge cases AND error paths",
    "Keep tests fast — no real network calls in unit tests",
    "Test names should read as documentation",
    "Avoid test interdependencies — tests must run in any order",
] as const;
