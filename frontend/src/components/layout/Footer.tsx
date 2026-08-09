import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">

                {/* Logo & Copyright */}
                <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold text-blue-600">
                        CodeSentinel
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        © 2026 CodeSentinel. All rights reserved.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-wrap items-center justify-center gap-6">
                    <Link
                        to="/about"
                        className="text-gray-600 transition hover:text-blue-600"
                    >
                        About
                    </Link>

                    <Link
                        to="/privacy"
                        className="text-gray-600 transition hover:text-blue-600"
                    >
                        Privacy
                    </Link>

                    <Link
                        to="/terms"
                        className="text-gray-600 transition hover:text-blue-600"
                    >
                        Terms
                    </Link>

                    <Link
                        to="/contact"
                        className="text-gray-600 transition hover:text-blue-600"
                    >
                        Contact
                    </Link>

                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 transition hover:text-blue-600"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}