import { useState } from "react";

interface ReviewRequestProps {repository: any; onClose: () => void;}

export const ReviewRequest = ({ repository, onClose, }: ReviewRequestProps) => {
    const [question, setQuestion] = useState("");

    const handleSubmit = async () => {
        if (!question.trim()) {
            return;
        }

        console.log("Repository:", repository);
        console.log("Question:", question);

        // API call will go here
        // await reviewService(question);
    };

    return (
        <div
            className="
                fixed
                top-0
                right-0
                z-50
                h-screen
                w-full
                sm:w-[30%]
                min-w-[360px]
                overflow-hidden
                border-l
                border-purple-500/20
                bg-[#080b14]
                shadow-[-20px_0_60px_rgba(79,70,229,0.15)]
            "
        >
            <div className="relative flex h-full flex-col">

                {/* Background Glow */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-32
                        -top-32
                        h-80
                        w-80
                        rounded-full
                        bg-purple-600/20
                        blur-3xl
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-32
                        -left-32
                        h-80
                        w-80
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
                        shrink-0
                        items-center
                        justify-between
                        border-b
                        border-white/10
                        bg-gradient-to-r
                        from-purple-500/10
                        via-blue-500/5
                        to-transparent
                        px-6
                        py-5
                    "
                >
                    <div className="flex items-center gap-3">

                        {/* AI Icon */}
                        <div
                            className="
                                flex
                                h-11
                                w-11
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
                            <span className="text-xl">✦</span>
                        </div>

                        <div>
                            <h1 className="text-lg font-semibold text-white">
                                Review Request
                            </h1>

                            <p className="text-xs text-slate-400">
                                AI-powered code analysis
                            </p>
                        </div>
                    </div>

                    {/* Close */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-white/10
                            bg-white/5
                            text-slate-400
                            transition-all
                            duration-200
                            hover:border-red-500/30
                            hover:bg-red-500/10
                            hover:text-red-400
                        "
                    >
                        ✕
                    </button>
                </div>

                {/* Middle Content */}
                <div
                    className="
                        relative
                        flex-1
                        overflow-y-auto
                        px-6
                        py-6
                    "
                >

                    {/* Repository Card */}
                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-2xl
                            border
                            border-cyan-400/20
                            bg-gradient-to-br
                            from-cyan-500/10
                            via-blue-500/5
                            to-purple-500/10
                            p-5
                            shadow-lg
                            shadow-blue-900/10
                        "
                    >

                        {/* Card Glow */}
                        <div
                            className="
                                absolute
                                -right-10
                                -top-10
                                h-24
                                w-24
                                rounded-full
                                bg-cyan-400/10
                                blur-2xl
                            "
                        />

                        <div className="relative">

                            <div className="mb-3 flex items-center gap-2">
                                <span className="text-lg">📦</span>

                                <span
                                    className="
                                        text-xs
                                        font-medium
                                        uppercase
                                        tracking-wider
                                        text-cyan-400
                                    "
                                >
                                    Repository
                                </span>
                            </div>

                            <h2
                                className="
                                    text-lg
                                    font-semibold
                                    text-white
                                "
                            >
                                {repository?.name}
                            </h2>

                            {repository?.description && (
                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        leading-relaxed
                                        text-slate-400
                                    "
                                >
                                    {repository.description}
                                </p>
                            )}

                            {/* Status */}
                            <div className="mt-4 flex items-center gap-2">

                                <span
                                    className="
                                        h-2
                                        w-2
                                        animate-pulse
                                        rounded-full
                                        bg-emerald-400
                                    "
                                />

                                <span className="text-xs text-emerald-400">
                                    Repository selected
                                </span>

                            </div>
                        </div>
                    </div>

                    {/* What AI Can Do */}
                    <div className="mt-7">

                        <h3
                            className="
                                mb-3
                                text-sm
                                font-semibold
                                text-slate-200
                            "
                        >
                            What would you like to review?
                        </h3>

                        <div className="grid grid-cols-2 gap-3">

                            <div
                                className="
                                    rounded-xl
                                    border
                                    border-purple-500/20
                                    bg-purple-500/5
                                    p-3
                                    transition
                                    hover:border-purple-500/40
                                    hover:bg-purple-500/10
                                "
                            >
                                <span className="text-lg">🔐</span>

                                <p className="mt-2 text-xs font-medium text-purple-300">
                                    Security
                                </p>
                            </div>

                            <div
                                className="
                                    rounded-xl
                                    border
                                    border-blue-500/20
                                    bg-blue-500/5
                                    p-3
                                    transition
                                    hover:border-blue-500/40
                                    hover:bg-blue-500/10
                                "
                            >
                                <span className="text-lg">⚡</span>

                                <p className="mt-2 text-xs font-medium text-blue-300">
                                    Performance
                                </p>
                            </div>

                            <div
                                className="
                                    rounded-xl
                                    border
                                    border-emerald-500/20
                                    bg-emerald-500/5
                                    p-3
                                    transition
                                    hover:border-emerald-500/40
                                    hover:bg-emerald-500/10
                                "
                            >
                                <span className="text-lg">🧠</span>

                                <p className="mt-2 text-xs font-medium text-emerald-300">
                                    Logic
                                </p>
                            </div>

                            <div
                                className="
                                    rounded-xl
                                    border
                                    border-orange-500/20
                                    bg-orange-500/5
                                    p-3
                                    transition
                                    hover:border-orange-500/40
                                    hover:bg-orange-500/10
                                "
                            >
                                <span className="text-lg">🏗️</span>

                                <p className="mt-2 text-xs font-medium text-orange-300">
                                    Architecture
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Bottom Input Area */}
                <div
                    className="
                        relative
                        shrink-0
                        border-t
                        border-white/10
                        bg-[#0a0e19]/95
                        p-5
                        backdrop-blur-xl
                    "
                >

                    {/* Input Label */}
                    <div className="mb-2 flex items-center justify-between">

                        <label
                            htmlFor="review-question"
                            className="
                                text-xs
                                font-medium
                                text-slate-300
                            "
                        >
                            Review instructions
                        </label>

                        <span className="text-[10px] text-slate-600">
                            AI Agent
                        </span>

                    </div>

                    {/* Input */}
                    <div
                        className="
                            relative
                            rounded-2xl
                            border
                            border-purple-500/20
                            bg-gradient-to-br
                            from-purple-500/5
                            to-blue-500/5
                            transition-all
                            duration-200
                            focus-within:border-purple-500/60
                            focus-within:shadow-lg
                            focus-within:shadow-purple-500/10
                        "
                    >
                        <textarea
                            id="review-question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Ask the AI to analyze your code..."
                            rows={4}
                            className="
                                w-full
                                resize-none
                                rounded-2xl
                                bg-transparent
                                px-4
                                py-3
                                text-sm
                                leading-relaxed
                                text-white
                                outline-none
                                placeholder:text-slate-600
                            "
                        />

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                border-t
                                border-white/5
                                px-4
                                py-2
                            "
                        >
                            <span className="text-[10px] text-slate-600">
                                Be specific for better results
                            </span>

                            <span className="text-[10px] text-slate-600">
                                {question.length}/500
                            </span>
                        </div>
                    </div>

                    {/* Start Review Button */}
                    <button
                        type="button"
                        disabled={!question.trim()}
                        onClick={handleSubmit}
                        className="
                            group
                            relative
                            mt-3
                            w-full
                            overflow-hidden
                            rounded-xl
                            bg-gradient-to-r
                            from-purple-600
                            via-indigo-600
                            to-blue-600
                            px-4
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-indigo-600/20
                            transition-all
                            duration-200
                            hover:scale-[1.01]
                            hover:shadow-xl
                            hover:shadow-purple-600/30
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                            disabled:hover:scale-100
                        "
                    >

                        {/* Button Shine */}
                        <span
                            className="
                                absolute
                                inset-0
                                -translate-x-full
                                bg-gradient-to-r
                                from-transparent
                                via-white/10
                                to-transparent
                                transition-transform
                                duration-700
                                group-hover:translate-x-full
                            "
                        />

                        <span className="relative flex items-center justify-center gap-2">
                            <span>✦</span>
                            <span>Start AI Review</span>
                            <span>→</span>
                        </span>

                    </button>

                </div>
            </div>
        </div>
    );
};