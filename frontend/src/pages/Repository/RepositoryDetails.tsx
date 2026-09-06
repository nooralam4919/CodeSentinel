import { useEffect, useState } from "react";
import { useRepository } from "../../services/useRepository.service.ts";
import { GithubReository } from "../../services/repository.service.ts";
import { ReviewRequest } from "../Reviews/ReviewRequest.tsx";

interface SelectRepositoryProps {
    onClose: () => void;
}

export default function SelectRepository({onClose,}: SelectRepositoryProps) {
    const {
        repositories,
        loading,
        error,
        getRepositories,
    } = useRepository();

    const { getRepValue } = GithubReository();

    const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
    const [uploading, setUploading] = useState(false);

    // Controls which screen is shown
    const [reviewSection, setReviewSection] = useState(false);

    useEffect(() => {
        getRepositories();
    }, []);

    const sendRepoToBackend = async (repo: any) => {
        try {
            setUploading(true);

            console.log("Sending repository to backend");
            console.log("id:", repo.id);
            console.log("name:", repo.name);
            console.log("full_name:", repo.full_name);
            console.log("owner:", repo.owner.login);
            console.log("default_branch:", repo.default_branch);
            console.log("clone_url:", repo.clone_url);

            // Send repository to backend
            const result = await getRepValue(repo.clone_url);

            console.log(
                "Repository sent successfully",
                result
            );

            // Move to Review Request section
            setReviewSection(true);

        } catch (error) {
            console.error(
                "Failed to send repository to backend:",
                error
            );
        } finally {
            setUploading(false);
        }
    };


    if (reviewSection && selectedRepo) {
        return (
            <ReviewRequest
                repository={selectedRepo}
                onClose={onClose}
            />
        );
    }

    return (
        <div
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                bg-black/70
                p-4
                backdrop-blur-sm
            "
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
                    flex
                    w-full
                    max-w-2xl
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#0b0f1a]
                    shadow-2xl
                    shadow-black/50
                "
                style={{ maxHeight: "85vh" }}
            >

                {/* HEADER */}

                <div
                    className="
                        flex shrink-0
                        items-center justify-between
                        border-b border-white/10
                        px-6 py-5
                    "
                >
                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            Select GitHub Repository
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Choose a repository to analyze
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        disabled={uploading}
                        className="
                            flex h-9 w-9
                            items-center justify-center
                            rounded-lg
                            text-slate-400
                            hover:bg-white/10
                            hover:text-white
                            disabled:opacity-50
                        "
                    >
                        ✕
                    </button>
                </div>

                {/* CONTENT */}

                <div
                    className="
                        min-h-0 flex-1
                        overflow-y-auto
                        px-6 py-5
                    "
                >

                    {loading && (
                        <div className="flex flex-col items-center py-16">
                            <div
                                className="
                                    h-10 w-10 animate-spin
                                    rounded-full border-4
                                    border-slate-700
                                    border-t-indigo-500
                                "
                            />

                            <p className="mt-4 text-sm text-slate-400">
                                Loading repositories...
                            </p>
                        </div>
                    )}

                    {error && !loading && (
                        <div
                            className="
                                rounded-xl border
                                border-red-500/20
                                bg-red-500/10 p-4
                            "
                        >
                            <p className="font-medium text-red-400">
                                Failed to load repositories
                            </p>

                            <p className="mt-1 text-sm text-red-400/70">
                                {error}
                            </p>
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        repositories.length === 0 && (
                            <div className="py-16 text-center">
                                <div className="mb-4 text-2xl">
                                    📦
                                </div>

                                <h3 className="font-medium text-white">
                                    No repositories found
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    No GitHub repositories are available.
                                </p>
                            </div>
                        )}

                    {!loading &&
                        !error &&
                        repositories.length > 0 && (
                            <div className="space-y-3">

                                {repositories.map((repo) => {
                                    const isSelected =
                                        selectedRepo?.id === repo.id;

                                    return (
                                        <button
                                            key={repo.id}
                                            type="button"
                                            onClick={() => {
                                                setSelectedRepo(repo);
                                            }}
                                            className={`
                                                group w-full rounded-xl
                                                border p-4 text-left
                                                transition-all

                                                ${
                                                    isSelected
                                                        ? `
                                                            border-indigo-500
                                                            bg-indigo-500/10
                                                        `
                                                        : `
                                                            border-white/10
                                                            bg-white/[0.02]
                                                            hover:border-indigo-500/40
                                                            hover:bg-indigo-500/[0.06]
                                                        `
                                                }
                                            `}
                                        >
                                            <div className="flex items-start gap-4">

                                                <div
                                                    className={`
                                                        flex h-11 w-11
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-xl

                                                        ${
                                                            isSelected
                                                                ? "bg-indigo-500/20"
                                                                : "bg-white/5"
                                                        }
                                                    `}
                                                >
                                                    <span>
                                                        Git
                                                    </span>
                                                </div>

                                                <div className="min-w-0 flex-1">

                                                    <div className="flex items-center justify-between">

                                                        <h3
                                                            className={`
                                                                truncate
                                                                font-medium

                                                                ${
                                                                    isSelected
                                                                        ? "text-indigo-400"
                                                                        : "text-white"
                                                                }
                                                            `}
                                                        >
                                                            {repo.name}
                                                        </h3>

                                                        <span>
                                                            {isSelected
                                                                ? "✓"
                                                                : "→"}
                                                        </span>
                                                    </div>

                                                    <p className="mt-1 text-sm text-slate-500">
                                                        {repo.description ||
                                                            "No description available"}
                                                    </p>

                                                    {isSelected && (
                                                        <div className="mt-3 flex gap-2">

                                                            <span
                                                                className="
                                                                    rounded-md
                                                                    bg-indigo-500/10
                                                                    px-2 py-1
                                                                    text-xs
                                                                    text-indigo-400
                                                                "
                                                            >
                                                                Selected
                                                            </span>

                                                            <span
                                                                className="
                                                                    rounded-md
                                                                    bg-white/5
                                                                    px-2 py-1
                                                                    text-xs
                                                                    text-slate-400
                                                                "
                                                            >
                                                                {repo.default_branch}
                                                            </span>

                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}

                            </div>
                        )}
                </div>

                {/* FOOTER */}

                <div
                    className="
                        flex shrink-0
                        items-center justify-between
                        border-t border-white/10
                        px-6 py-4
                    "
                >

                    <p className="text-xs text-slate-500">
                        {repositories.length}{" "}
                        {repositories.length === 1
                            ? "repository"
                            : "repositories"}{" "}
                        available
                    </p>

                    <div className="flex items-center gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={uploading}
                            className="
                                rounded-lg
                                border border-white/10
                                px-4 py-2
                                text-sm text-slate-400
                                hover:bg-white/5
                                hover:text-white
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            disabled={!selectedRepo || uploading}
                            onClick={() => {
                                if (!selectedRepo) return;

                                sendRepoToBackend(selectedRepo);
                            }}
                            className="
                                rounded-lg
                                bg-indigo-600
                                px-5 py-2
                                text-sm font-medium
                                text-white
                                hover:bg-indigo-500
                                disabled:cursor-not-allowed
                                disabled:bg-slate-800
                                disabled:text-slate-500
                            "
                        >
                            {uploading
                                ? "Uploading..."
                                : selectedRepo
                                ? "Continue"
                                : "Select a repository"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}