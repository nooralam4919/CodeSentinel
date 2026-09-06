import { useState } from "react";
import ReviewCode from "../Reviews/ReviewCode.tsx";
import {ApiCallforSubmittingQuary} from "../../services/QuestionAnsDetail.service.ts"

interface ReviewRequestProps {
    repository: any;
    onClose: () => void;
}

export const ReviewRequest = ({
    repository,
    onClose,
}: ReviewRequestProps) => {
    const [question, setQuestion] = useState("");
    const [reviewSection, setReviewSection] = useState<any | null>(null);

    const handleSubmit = async () => {
        if (!question.trim()) {
            return;
        }
        // console.log("Repository:", repository);
        console.log("Question:", question);

        // API call
        const detailCode = await ApiCallforSubmittingQuary(question);


        // Store API response
        setReviewSection(detailCode);
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

                    {/* Repository */}
                    <div
                        className="
                            rounded-2xl
                            border
                            border-cyan-400/20
                            bg-cyan-500/10
                            p-5
                        "
                    >
                        <div className="mb-3 flex items-center gap-2">
                            <span>📦</span>

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

                        <h2 className="text-lg font-semibold text-white">
                            {repository?.name}
                        </h2>

                        {repository?.description && (
                            <p className="mt-2 text-sm text-slate-400">
                                {repository.description}
                            </p>
                        )}
                    </div>

                    {/* Review Code */}
                    {reviewSection && (
                        <div className="mt-6">
                            <ReviewCode
                                outPut={reviewSection}
                            />
                        </div>
                    )}

                </div>

                {/* Bottom Input */}
                <div
                    className="
                        relative
                        shrink-0
                        border-t
                        border-white/10
                        bg-[#0a0e19]/95
                        p-5
                    "
                >

                    <div className="mb-2 flex items-center justify-between">

                        <label
                            htmlFor="review-question"
                            className="text-xs font-medium text-slate-300"
                        >
                            Review instructions
                        </label>

                        <span className="text-[10px] text-slate-600">
                            AI Agent
                        </span>

                    </div>

                    <div
                        className="
                            rounded-2xl
                            border
                            border-purple-500/20
                            bg-purple-500/5
                            focus-within:border-purple-500/60
                        "
                    >
                        <textarea
                            id="review-question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Ask the AI to analyze your code..."
                            rows={4}
                            maxLength={500}
                            className="
                                w-full
                                resize-none
                                rounded-2xl
                                bg-transparent
                                px-4
                                py-3
                                text-sm
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

                    <button
                        type="button"
                        disabled={!question.trim()}
                        onClick={handleSubmit}
                        className="
                            mt-3
                            w-full
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
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        ✦ Start AI Review →
                    </button>

                </div>
            </div>
        </div>
    );
};