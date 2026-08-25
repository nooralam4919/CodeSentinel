import fs from "fs/promises";

export const Chunking = async (files: string[]) => {

    for (const file of files) {

        const content = await fs.readFile(
            file,
            "utf-8"
        );

        const response = await fetch(
            "http://review-engine:9000/process",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    filePath: file,
                    content: content
                })
            }
        );

        const result = await response.json();
        console.log("this is cumming form review engin() 👍👍👍👍👍👍👍", result)

        console.log(result);
    }
};