import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 150,
    separators: [
        "\n## ",
        "\n### ",
        "\n\n",
        "\n",
        ". ",
        " ",
        ""
    ],
});

export const chunkMarkdown = async (markdown: string) => {
    const chunks = await splitter.createDocuments([markdown]);

    console.log("Number of chunks:", chunks.length);

    return chunks;
};