import { useState } from "react";
import { ApiCallforSubmittingQuary } from "../services/QuestionAnsDetail.service";

export function useReview() {
    const [reviewResult, setReviewResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const submitReview = async (question: string) => {
        try {
            setLoading(true);
            setError("");

            const data = await ApiCallforSubmittingQuary(question);
            setReviewResult(data);
            return data;
        } catch (err: any) {
            setError(err.message || "Review request failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resetReview = () => {
        setReviewResult(null);
        setError("");
    };

    return {
        reviewResult,
        loading,
        error,
        submitReview,
        resetReview,
    };
}
