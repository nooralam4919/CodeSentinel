import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const baseLLM = async ( question: string, context: string ): Promise<string> => {

    try {
        const prompt = ` You are CodeSentinel, an AI assistant that understands and explains software codebases.

        Your task is to answer the user's question using the provided code context.

        USER QUESTION:
        ${question}

        RELEVANT CODE CONTEXT:
        ${context}

        INSTRUCTIONS:
        - Answer the question clearly and accurately.
        - Use the provided code context as the primary source.
        - Explain the relevant files, functions, classes, or logic when useful.
        - Do not invent code or information that is not present in the context.
        - If the provided context is insufficient to answer the question, say that clearly.
        - Keep the answer easy to understand.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text ?? "Unable to generate an answer.";

        } catch (error) {
            console.error("Error in baseLLM:", error);

            throw new Error(
                error instanceof Error
                    ? error.message
                    : "Failed to generate LLM response"
            );
        }
};