import { apiFetch } from "./api";

// Fetch the currently logged-in user's profile.
export async function getCurrentUser() {
    const data = await apiFetch("/api/v1/user/me", { method: "GET" });
    return data.data as {
        id: string;
        name: string;
        email: string;
        avatarUrl: string | null;
        provider: string;
        githubUsername: string | null;
        createdAt: string;
    };
}

// Upload a file (PDF / document) for the current user.
export async function uploadUserFile(file: File) {
    const formData = new FormData();
    formData.append("downlodedFile", file);

    const response = await fetch("http://localhost:4000/api/v1/user/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
        // NOTE: do NOT set Content-Type here — the browser sets it
        // automatically with the correct multipart boundary.
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "File upload failed");
    }

    return data;
}
