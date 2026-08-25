import { useEffect, useState } from "react";
import { useRepository } from "../../hooks/useRepository";
import { GithubReository } from "../../hooks/GithubRepository";

interface SelectRepositoryProps {
    onClose: () => void;
}

export default function SelectRepository({onClose, }: SelectRepositoryProps) {
    const {
        repositories,
        loading,
        error,
        getRepositories,
    } = useRepository();

    const {getRepValue} = GithubReository();

    // Selected repository
    const [selectedRepo, setSelectedRepo] = useState<any | null>(null);

    // Uploading state
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        getRepositories();
    }, []);

    // Send selected repository to backend
    const sendRepoToBacend = async (repo: any) => {
        try {
            setUploading(true);

            console.log("Sending repository to backend");

            console.log("id:", repo.id);
            console.log("name:", repo.name);
            console.log("full_name:", repo.full_name);
            console.log("owner:", repo.owner.login);
            console.log("default_branch:", repo.default_branch);
            console.log(
                "this is the clone url for my project:",
                repo.clone_url
            );

            // Send repository to backend
            await getRepValue(repo.clone_url);

            console.log("Repository sent successfully");

            // Close modal after successful request
            onClose();

        } catch (error) {
            console.error(
                "Failed to send repository to backend:",
                error
            );
        } finally {
            setUploading(false);
        }
    };

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
            {/* Modal */}
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
                {/* ================= HEADER ================= */}
                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        justify-between
                        border-b
                        border-white/10
                        px-6
                        py-5
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

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        disabled={uploading}
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            text-slate-400
                            transition
                            hover:bg-white/10
                            hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        ✕
                    </button>
                </div>

                {/* ================= CONTENT ================= */}
                <div
                    className="
                        min-h-0
                        flex-1
                        overflow-y-auto
                        px-6
                        py-5
                        scrollbar-thin
                        scrollbar-track-transparent
                        scrollbar-thumb-slate-700
                    "
                >
                    {/* ================= LOADING ================= */}
                    {loading && (
                        <div
                            className="
                                flex
                                flex-col
                                items-center
                                justify-center
                                py-16
                            "
                        >
                            <div
                                className="
                                    h-10
                                    w-10
                                    animate-spin
                                    rounded-full
                                    border-4
                                    border-slate-700
                                    border-t-indigo-500
                                "
                            />

                            <p className="mt-4 text-sm text-slate-400">
                                Loading repositories...
                            </p>
                        </div>
                    )}

                    {/* ================= ERROR ================= */}
                    {error && !loading && (
                        <div
                            className="
                                rounded-xl
                                border
                                border-red-500/20
                                bg-red-500/10
                                p-4
                            "
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-red-500/10
                                        text-red-400
                                    "
                                >
                                    !
                                </div>

                                <div>
                                    <p className="font-medium text-red-400">
                                        Failed to load repositories
                                    </p>

                                    <p className="mt-1 text-sm text-red-400/70">
                                        {error}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ================= EMPTY ================= */}
                    {!loading &&
                        !error &&
                        repositories.length === 0 && (
                            <div
                                className="
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                    py-16
                                    text-center
                                "
                            >
                                <div
                                    className="
                                        mb-4
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-white/5
                                        text-2xl
                                    "
                                >
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

                    {/* ================= REPOSITORY LIST ================= */}
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
                                                console.log(
                                                    "Selected repository:",
                                                    repo
                                                );

                                                // Only select
                                                // DO NOT call backend here
                                                setSelectedRepo(repo);
                                            }}
                                            className={`
                                                group
                                                w-full
                                                rounded-xl
                                                border
                                                p-4
                                                text-left
                                                transition-all
                                                duration-200

                                                ${
                                                    isSelected
                                                        ? `
                                                            border-indigo-500
                                                            bg-indigo-500/10
                                                            shadow-lg
                                                            shadow-indigo-500/10
                                                        `
                                                        : `
                                                            border-white/10
                                                            bg-white/[0.02]
                                                            hover:border-indigo-500/40
                                                            hover:bg-indigo-500/[0.06]
                                                            hover:shadow-lg
                                                            hover:shadow-indigo-500/5
                                                        `
                                                }
                                            `}
                                        >
                                            <div className="flex items-start gap-4">

                                                {/* ================= GITHUB ICON ================= */}
                                                <div
                                                    className={`
                                                        flex
                                                        h-11
                                                        w-11
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        transition

                                                        ${
                                                            isSelected
                                                                ? "bg-indigo-500/20"
                                                                : "bg-white/5 group-hover:bg-indigo-500/10"
                                                        }
                                                    `}
                                                >
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        className={`
                                                            h-5
                                                            w-5
                                                            transition

                                                            ${
                                                                isSelected
                                                                    ? "fill-indigo-400"
                                                                    : "fill-slate-300 group-hover:fill-indigo-400"
                                                            }
                                                        `}
                                                    >
                                                        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.85 10.91.57.1.78-.25.78-.55v-2.13c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.77 1.04.77 2.1v3.11c0 .3.21.65.79.54A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                                                    </svg>
                                                </div>

                                                {/* ================= REPOSITORY INFO ================= */}
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center justify-between gap-3">

                                                        <h3
                                                            className={`
                                                                truncate
                                                                font-medium
                                                                transition

                                                                ${
                                                                    isSelected
                                                                        ? "text-indigo-400"
                                                                        : "text-white group-hover:text-indigo-400"
                                                                }
                                                            `}
                                                        >
                                                            {repo.name}
                                                        </h3>

                                                        {/* Selected check */}
                                                        <span
                                                            className={`
                                                                shrink-0
                                                                text-lg
                                                                transition

                                                                ${
                                                                    isSelected
                                                                        ? "text-indigo-400"
                                                                        : "text-slate-600 group-hover:text-indigo-400"
                                                                }
                                                            `}
                                                        >
                                                            {isSelected
                                                                ? "✓"
                                                                : "→"}
                                                        </span>
                                                    </div>

                                                    <p
                                                        className="
                                                            mt-1
                                                            line-clamp-2
                                                            text-sm
                                                            leading-5
                                                            text-slate-500
                                                        "
                                                    >
                                                        {repo.description ||
                                                            "No description available"}
                                                    </p>

                                                    {/* Repository details */}
                                                    {isSelected && (
                                                        <div
                                                            className="
                                                                mt-3
                                                                flex
                                                                flex-wrap
                                                                gap-2
                                                            "
                                                        >
                                                            <span
                                                                className="
                                                                    rounded-md
                                                                    bg-indigo-500/10
                                                                    px-2
                                                                    py-1
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
                                                                    px-2
                                                                    py-1
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

                {/* ================= FOOTER ================= */}
                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        justify-between
                        border-t
                        border-white/10
                        px-6
                        py-4
                    "
                >
                    {/* Repository count */}
                    <p className="text-xs text-slate-500">
                        {repositories.length}{" "}
                        {repositories.length === 1
                            ? "repository"
                            : "repositories"}{" "}
                        available
                    </p>

                    <div className="flex items-center gap-3">

                        {/* Cancel */}
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={uploading}
                            className="
                                rounded-lg
                                border
                                border-white/10
                                px-4
                                py-2
                                text-sm
                                text-slate-400
                                transition
                                hover:bg-white/5
                                hover:text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            Cancel
                        </button>

                        {/* Select Repository */}
                        <button
                            type="button"
                            disabled={!selectedRepo || uploading}
                            onClick={() => {
                                if (!selectedRepo) return;

                                sendRepoToBacend(selectedRepo);
                            }}
                            className="
                                rounded-lg
                                bg-indigo-600
                                px-5
                                py-2
                                text-sm
                                font-medium
                                text-white
                                transition

                                hover:bg-indigo-500

                                disabled:cursor-not-allowed
                                disabled:bg-slate-800
                                disabled:text-slate-500
                            "
                        >
                            {uploading ? (
                                <span className="flex items-center gap-2">
                                    <span
                                        className="
                                            h-4
                                            w-4
                                            animate-spin
                                            rounded-full
                                            border-2
                                            border-slate-500
                                            border-t-white
                                        "
                                    />

                                    Uploading...
                                </span>
                            ) : selectedRepo ? (
                                "Select repo"
                            ) : (
                                "Select a repository"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}