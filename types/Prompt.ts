export const PROMPT_CATEGORIES = [
    "topic",
    "audience",
    "role",
    "tone",
    "format",
    "requirements",
    "inspiration",
] as const;

export type PromptCategory = typeof PROMPT_CATEGORIES[number];
