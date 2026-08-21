import fs from "node:fs";
import path from "node:path";
import { ApiError } from "../utils/ApiError.js";

export const parseWithDocling = async (filePath: string) => {
    if (!filePath) {
        throw new ApiError(400, "File path is missing");
    }

    const SERVER_URL =
        process.env.DOCLING_URL || "http://localhost:5001";

    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    const formData = new FormData();

    formData.append(
        "files",
        new Blob([fileBuffer]),
        fileName
    );

    console.log("Sending file to Docling...");

    const response = await fetch(
        `${SERVER_URL}/v1/convert/file`,
        {
            method: "POST",
            body: formData,
        }
    );

    console.log("Docling status:", response.status);

    if (!response.ok) {
        const error = await response.text();

        console.error("Docling error:", error);

        throw new ApiError(
            response.status,
            "Docling service failed"
        );
    }

    const result = await response.json();

    console.log("Docling conversion successful");

    return result;
};