export const PERFORMANCE_SMELLS = [
    "N+1 database query pattern",
    "Synchronous operations blocking the event loop",
    "Sequential async calls that could be parallelized",
    "Missing database indexes on frequently queried columns",
    "Loading entire table rows when only specific columns are needed",
    "Unbounded queries without LIMIT clauses",
    "Repeated computation that could be memoized or cached",
    "Large payloads sent over the network without pagination",
    "Inefficient string concatenation in loops",
    "Missing connection pooling for database/HTTP clients",
] as const;
