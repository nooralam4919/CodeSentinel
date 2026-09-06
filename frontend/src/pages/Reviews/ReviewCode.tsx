import React, { useState } from "react";

interface ReviewCodeProps {
    outPut: any;
}

export default function ReviewCode({ outPut }: ReviewCodeProps) {
    const [stopWriting, setStopWriting] = useState(false);

    const stopHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setStopWriting(true);
    };

    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-purple-500/20
                bg-gradient-to-br
                from-[#111827]
                via-[#0b1020]
                to-[#080b14]
                shadow-xl
                shadow-purple-950/30
            "
        >

            {/* Background Glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-48
                    w-48
                    rounded-full
                    bg-purple-600/20
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-20
                    -left-20
                    h-48
                    w-48
                    rounded-full
                    bg-blue-600/10
                    blur-3xl
                "
            />

            {/* Header */}
            <div
                className="
                    relative
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/10
                    bg-white/[0.02]
                    px-5
                    py-4
                "
            >
                <div className="flex items-center gap-3">

                    {/* AI Icon */}
                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-gradient-to-br
                            from-purple-600
                            to-blue-600
                            shadow-lg
                            shadow-purple-600/30
                        "
                    >
                        <span className="text-lg text-white">
                            ✦
                        </span>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-white">
                            AI Code Review
                        </h2>

                        <div className="mt-1 flex items-center gap-2">
                            <span
                                className={`
                                    h-2
                                    w-2
                                    rounded-full
                                    ${
                                        stopWriting
                                            ? "bg-red-400"
                                            : "animate-pulse bg-emerald-400"
                                    }
                                `}
                            />

                            <span className="text-[10px] text-slate-400">
                                {stopWriting
                                    ? "Review stopped"
                                    : "Analyzing code"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div
                    className="
                        rounded-full
                        border
                        border-purple-500/20
                        bg-purple-500/10
                        px-3
                        py-1
                    "
                >
                    <span className="text-[10px] font-medium text-purple-300">
                        AI AGENT
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="relative p-5">

                {/* Review Output */}
                <div
                    className="
                        overflow-hidden
                        rounded-xl
                        border
                        border-white/10
                        bg-black/20
                    "
                >

                    {/* Output Header */}
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-white/10
                            px-4
                            py-3
                        "
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-sm">
                                🔍
                            </span>

                            <span className="text-xs font-medium text-slate-200">
                                Review Result
                            </span>
                        </div>

                        <span className="text-[10px] text-slate-500">
                            AI Generated
                        </span>
                    </div>

                    {/* Output */}
                    <div
                        className="
                            max-h-64
                            overflow-y-auto
                            px-4
                            py-4
                        "
                    >
                        {outPut ? (
                            <p
                                className="
                                    whitespace-pre-wrap
                                    text-xs
                                    leading-6
                                    text-slate-300
                                "
                            >
                                {outPut.data}
                            </p>
                        ) : (
                            <div className="flex flex-col items-center py-8">
                                <div className="mb-3 text-3xl">
                                    ✦
                                </div>

                                <p className="text-xs text-slate-500">
                                    Waiting for AI review...
                                </p>
                            </div>
                        )}
                    </div>
                </div>



                {/* Stop Button */}
                <button
                    type="button"
                    onClick={stopHandler}
                    disabled={stopWriting}
                    className="
                        group
                        relative
                        mt-4
                        w-full
                        overflow-hidden
                        rounded-xl
                        border
                        border-red-500/30
                        bg-gradient-to-r
                        from-red-500/15
                        to-orange-500/10
                        px-4
                        py-3
                        text-xs
                        font-semibold
                        text-red-300
                        transition-all
                        duration-200
                        hover:border-red-500/50
                        hover:bg-red-500/20
                        hover:text-red-200
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    <span className="relative flex items-center justify-center gap-2">

                        <span
                            className="
                                flex
                                h-2
                                w-2
                                rounded-full
                                bg-red-400
                            "
                        />

                        <span>
                            {stopWriting
                                ? "REVIEW STOPPED"
                                : "STOP AI REVIEW"}
                        </span>
                    </span>
                </button>

                {/* Footer */}
                <div className="mt-3 flex items-center justify-between">
                    <span className="text-[9px] text-slate-600">
                        CodeSentinel AI
                    </span>

                    <span className="text-[9px] text-slate-600">
                        Review Engine
                    </span>
                </div>
            </div>
        </div>
    );
}

