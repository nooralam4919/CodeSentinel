// Centralised fetch wrapper.
// All API calls use this so the base URL is set in one place.

const BASE_URL = "http://localhost:4000";

interface ApiOptions extends RequestInit {
    body?: any;
}

export async function apiFetch<T = any>(
    path: string,
    options: ApiOptions = {}
): Promise<T> {
    const { body, headers, ...rest } = options;

    const response = await fetch(`${BASE_URL}${path}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(headers as Record<string, string>),
        },
        body: body ? JSON.stringify(body) : undefined,
        ...rest,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || `Request failed: ${response.status}`);
    }

    return data;
}
