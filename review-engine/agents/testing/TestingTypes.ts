export type TestType = "unit" | "integration" | "e2e";

export interface TestCase {
    name: string;
    type: TestType;
    target: string;
    description: string;
    codeExample: string;
}

export interface TestingReport {
    coverageEstimate: string;
    untestedPaths: string[];
    testCases: TestCase[];
    testabilityIssues: string[];
    recommendations: string[];
}
