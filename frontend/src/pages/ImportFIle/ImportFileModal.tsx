import { useState } from "react";

type ImportFileModalProps = {
  onClose: () => void;
};

export default function ImportFileModal({ onClose,}: ImportFileModalProps) {

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      console.log("Selected file:", file);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <div className="w-[400px] rounded-xl bg-slate-900 p-6">

        <h2 className="text-xl font-semibold text-white">
          Import your project
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Select a file to import into your project.
        </p>

        <input
          type="file"
          onChange={handleFileChange}
          className="mt-5 block w-full text-sm text-white"
        />

        <button
          onClick={onClose}
          className="mt-5 rounded-lg bg-slate-700 px-4 py-2 text-white"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}