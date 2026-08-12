export default function Footer() {
    return (
        <footer className="border-t border-white/[0.06] bg-[#0a0d17] px-6 py-4">
            <div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-slate-500">
                <p>© 2026 CodeSentinel. All rights reserved.</p>

                <div className="flex gap-4">
                    <a
                        href="/privacy"
                        className="transition hover:text-white"
                    >
                        Privacy
                    </a>

                    <a
                        href="/terms"
                        className="transition hover:text-white"
                    >
                        Terms
                    </a>
                </div>
            </div>
        </footer>
    );
}