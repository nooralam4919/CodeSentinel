import Button from "../common/Button";

type StartScanningProps = {
    onStartScanning: () => void;
    onClose: () => void;
};

export const StartScaning = ({ onStartScanning, onClose, }: StartScanningProps) => {
    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-7 shadow-2xl">
                
                <h1 className="text-2xl font-semibold text-white">
                    File uploaded successfully
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                    Your PDF has been uploaded successfully.
                    Would you like to start scanning it for security issues?
                </p>

                <div className="mt-7 flex gap-3">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300"
                    >
                        Later
                    </Button>

                    <Button
                        type="button"
                        onClick={onStartScanning}
                        className="flex-1 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white"
                    >
                        Start Scanning
                    </Button>
                </div>
            </div>
        </div>
    );
};