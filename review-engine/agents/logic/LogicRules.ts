export const LOGIC_SMELLS = [
    "Off-by-one errors in array iteration",
    "Mutating function arguments",
    "Missing null/undefined guards",
    "Incorrect async/await usage (missing await, fire-and-forget)",
    "Business logic duplicated across files",
    "Incorrect comparison operators (=== vs ==)",
    "Silent error swallowing in empty catch blocks",
    "Race conditions with shared mutable state",
    "Wrong return value or missing return",
    "Incorrect boolean logic (De Morgan's law violations)",
] as const;
