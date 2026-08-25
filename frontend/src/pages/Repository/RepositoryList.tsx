import { useMemo, useState } from "react";
import { useRepository } from "../../hooks/useRepository";

interface Repository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    private: boolean;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
}

interface RepositoryListProps {
    onSelect: (repository: Repository) => void;
    onClose: () => void;
}

export default function RepositoryList({ onSelect, onClose, }: RepositoryListProps) {

    const {
        repositories,
        loading,
        error,
    } = useRepository();

    const [search, setSearch] = useState("");

    const filteredRepositories = useMemo(() => {
        return repositories.filter((repo) =>
            repo.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [repositories, search]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">

            {/* Modal */}
            <div
                className="
                    flex
                    h-[85vh]
                    w-full
                    max-w-2xl
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#0c1020]
                    shadow-2xl
                    shadow-indigo-500/10
                    animate-[slideUp_0.25s_ease-out]
                "
            >

                {/* ================= HEADER ================= */}

                <div className="shrink-0 border-b border-white/10 px-6 py-5">

                    <div className="flex items-start justify-between">

                        <div>
                            <div className="flex items-center gap-3">

                                {/* GitHub Icon */}
                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/[0.05]
                                ">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-5 w-5 text-white"
                                        fill="currentColor"
                                    >
                                        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.01c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18A10.9 10.9 0 0 1 12 6.08c.97 0 1.94.13 2.85.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.35.78 1.04.78 2.1v3.12c0 .3.21.65.79.54A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                                    </svg>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-white">
                                        Select Repository
                                    </h2>

                                    <p className="mt-0.5 text-sm text-slate-500">
                                        Choose a GitHub repository to scan
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                text-slate-500
                                transition
                                hover:bg-white/[0.06]
                                hover:text-white
                            "
                        >
                            ✕
                        </button>

                    </div>

                    {/* ================= SEARCH ================= */}

                    <div className="relative mt-5">

                        <svg
                            className="
                                absolute
                                left-3.5
                                top-1/2
                                h-4
                                w-4
                                -translate-y-1/2
                                text-slate-500
                            "
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                cx="11"
                                cy="11"
                                r="7"
                            />
                            <path d="m20 20-3.5-3.5" />
                        </svg>

                        <input
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search repositories..."
                            className="
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-white/[0.04]
                                py-3
                                pl-10
                                pr-4
                                text-sm
                                text-white
                                outline-none
                                placeholder:text-slate-600
                                transition
                                focus:border-indigo-500/50
                                focus:bg-white/[0.06]
                            "
                        />

                    </div>

                </div>

                {/* ================= REPOSITORY AREA ================= */}

                <div className="min-h-0 flex-1 overflow-y-auto p-4">

                    {loading && (
                        <div className="flex h-full items-center justify-center">

                            <div className="text-center">

                                <div className="
                                    mx-auto
                                    h-8
                                    w-8
                                    animate-spin
                                    rounded-full
                                    border-2
                                    border-white/10
                                    border-t-indigo-400
                                " />

                                <p className="mt-4 text-sm text-slate-500">
                                    Loading repositories...
                                </p>

                            </div>

                        </div>
                    )}

                    {error && !loading && (
                        <div className="
                            rounded-xl
                            border
                            border-red-500/20
                            bg-red-500/[0.05]
                            p-5
                            text-center
                        ">
                            <p className="text-sm text-red-400">
                                {error}
                            </p>
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        filteredRepositories.length === 0 && (
                            <div className="
                                flex
                                h-full
                                items-center
                                justify-center
                            ">
                                <div className="text-center">

                                    <div className="
                                        mx-auto
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-white/[0.04]
                                        text-slate-500
                                    ">
                                        🔍
                                    </div>

                                    <p className="mt-4 text-sm text-slate-400">
                                        No repositories found
                                    </p>

                                    <p className="mt-1 text-xs text-slate-600">
                                        Try a different search
                                    </p>

                                </div>
                            </div>
                        )}

                    {/* Repository Cards */}

                    {!loading && !error && (
                        <div className="space-y-2">

                            {filteredRepositories.map((repo) => (

                                <div
                                    key={repo.id}
                                    className="
                                        group
                                        rounded-xl
                                        border
                                        border-white/[0.07]
                                        bg-white/[0.025]
                                        p-4
                                        transition-all
                                        duration-200
                                        hover:-translate-y-[1px]
                                        hover:border-indigo-500/30
                                        hover:bg-indigo-500/[0.05]
                                    "
                                >

                                    <div className="flex items-center justify-between gap-4">

                                        {/* Repository information */}

                                        <div className="min-w-0 flex-1">

                                            <div className="flex items-center gap-2">

                                                <h3 className="
                                                    truncate
                                                    text-sm
                                                    font-semibold
                                                    text-white
                                                ">
                                                    {repo.name}
                                                </h3>

                                                <span className="
                                                    shrink-0
                                                    rounded-full
                                                    border
                                                    border-white/10
                                                    px-2
                                                    py-0.5
                                                    text-[10px]
                                                    text-slate-500
                                                ">
                                                    {repo.private
                                                        ? "Private"
                                                        : "Public"}
                                                </span>

                                            </div>

                                            <p className="
                                                mt-1
                                                truncate
                                                text-xs
                                                text-slate-500
                                            ">
                                                {repo.description ||
                                                    "No description"}
                                            </p>

                                            {/* Metadata */}

                                            <div className="
                                                mt-3
                                                flex
                                                items-center
                                                gap-4
                                                text-[11px]
                                                text-slate-600
                                            ">

                                                {repo.language && (
                                                    <span>
                                                        ● {repo.language}
                                                    </span>
                                                )}

                                                <span>
                                                    ★ {repo.stargazers_count}
                                                </span>

                                                <span>
                                                    ⑂ {repo.forks_count}
                                                </span>

                                            </div>

                                        </div>

                                        {/* Select */}

                                        <button
                                            onClick={() =>
                                                onSelect(repo)
                                            }
                                            className="
                                                shrink-0
                                                rounded-lg
                                                bg-indigo-500
                                                px-4
                                                py-2
                                                text-xs
                                                font-semibold
                                                text-white
                                                opacity-0
                                                shadow-lg
                                                shadow-indigo-500/20
                                                transition-all
                                                group-hover:opacity-100
                                                hover:bg-indigo-400
                                            "
                                        >
                                            Select
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

                </div>

                {/* ================= FOOTER ================= */}

                {!loading && (
                    <div className="
                        shrink-0
                        border-t
                        border-white/10
                        px-6
                        py-3
                        text-xs
                        text-slate-600
                    ">
                        {filteredRepositories.length} repositories
                    </div>
                )}

            </div>
        </div>
    );
}