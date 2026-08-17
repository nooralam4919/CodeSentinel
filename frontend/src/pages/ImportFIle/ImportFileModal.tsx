import { useState } from "react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import FileUpload from "../../hooks/FileUpload";
import { StartScaning } from "../../components/layout/StartScaning";

type ImportFileModalProps = {
    onClose: () => void;
};

export default function ImportFileModal({ onClose,}: ImportFileModalProps) {
    const { fileToBackend } = FileUpload();
    
    const [showScanning, setShowScanning] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        console.log("Selected file:", selectedFile);

        // Check PDF
        if (selectedFile.type !== "application/pdf") {
            alert("Please select a PDF file.");
            return;
        }

        // Check 10 MB
        const maxSize = 10 * 1024 * 1024;

        if (selectedFile.size > maxSize) {
            alert("File size must be less than 10 MB.");
            return;
        }

        setFile(selectedFile);
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert("Please select a PDF first.");
            return;
        }

        try {
            setUploading(true);

            console.log("Uploading file:", file);

            const response = await fileToBackend(file);

            console.log("Upload response:", response);

            setShowScanning(true);

            setFile(null);
            onClose();
        } catch (error) {
            console.error("Upload failed:", error);
            alert("File upload failed.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Modal */}
            <div
                className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/50"
                onClick={(event) => event.stopPropagation()}
            >
                {/* Glow */}
                <div
                    className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl"
                />

                {/* Content */}
                <div className="relative p-7">
                    {/* Close */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg text-xl text-slate-500 transition hover:bg-white/10 hover:text-white"
                    >
                        ×
                    </button>

                    {/* Icon */}
                    <div
                        className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="12" y1="18" x2="12" y2="12" />
                            <line x1="9" y1="15" x2="12" y2="12" />
                            <line x1="15" y1="15" x2="12" y2="12" />
                        </svg>
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl font-semibold tracking-tight text-white">
                        Import your project
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        Upload your PDF project or document and let CodeSentinel
                        analyze it for security issues.
                    </p>

                    {/* Upload Area */}
                    <label
                        htmlFor="pdf-upload"
                        className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-800/40 px-6 py-8 text-center transition hover:border-indigo-500/50 hover:bg-indigo-500/5"
                    >
                        <div
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-400"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 3v12" />
                                <path d="m7 8 5-5 5 5" />
                                <path d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
                            </svg>
                        </div>

                        <p className="mt-4 text-sm font-medium text-white">
                            {file ? file.name : "Click to upload your PDF"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            PDF files only • Maximum 10 MB
                        </p>

                        <Input
                            id="pdf-upload"
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    {/* Selected File */}
                    {file && (
                        <div
                            className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <div
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400"
                                >
                                    PDF
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-white">
                                        {file.name}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setFile(null)}
                                className="ml-3 text-xs text-slate-500 transition hover:text-red-400"
                            >
                                Remove
                            </button>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="mt-7 flex gap-3">
                        <Button
                            type="button"
                            onClick={onClose}
                            disabled={uploading}
                            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            disabled={!file || uploading}
                            onClick={handleFileUpload}
                            className="flex-1 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {uploading ? "Uploading..." : "Upload PDF"}
                        </Button>
                    </div>

                    {/* Footer */}
                    <p className="mt-5 text-center text-[11px] text-slate-600">
                        Your files are securely processed and never shared.
                    </p>
                </div>
            </div>
        </div>
    );
}