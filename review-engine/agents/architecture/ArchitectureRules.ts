export const ARCHITECTURE_SMELLS = [
    "God class: one file/class doing too many things",
    "Circular dependencies between modules",
    "Business logic in route handlers / controllers",
    "Direct DB access from presentation layer",
    "Hardcoded configuration instead of dependency injection",
    "Missing abstraction layers (no service/repository pattern)",
    "Deep nesting and long function chains",
    "Leaking implementation details across layer boundaries",
] as const;
