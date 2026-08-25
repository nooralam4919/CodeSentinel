import { useState } from "react";

export function useRepository() {
    const [repositories, setRepositories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getRepositories = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:4000/api/v1/github/repos",
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch repositories"
                );
            }

            setRepositories(data.data || data);

            return data.data || data;
        } catch (error: any) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        repositories,
        loading,
        error,
        getRepositories,
    };
}