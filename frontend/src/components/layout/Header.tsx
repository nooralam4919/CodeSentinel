import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducerSlice";
import Button from "../common/Button";
import ImportFileModal from "../../pages/ImportFIle/ImportFileModal";

export function ShieldLogo({ size = 16 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

const publicNav = [
    { name: "Home", slug: "/" },
    { name: "Features", slug: "/features" },
    { name: "Docs", slug: "/docs" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(
        (state: any) => state.auth.status
    );

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const handleOpenImportModal = () => {
        setShowImportModal(true);
    };

    const handleCloseImportModal = () => {
        setShowImportModal(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#0a0d17]/90 backdrop-blur-md">

            <nav className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6 sm:px-10">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex shrink-0 items-center gap-2.5"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/30">
                        <ShieldLogo size={15} />
                    </span>

                    <span className="text-[15px] font-semibold tracking-tight text-white">
                        CodeSentinel
                    </span>
                </Link>

                {/* Desktop navigation */}
                <ul className="hidden items-center gap-0.5 lg:flex">

                    {publicNav.map(({ name, slug }) => (
                        <li key={slug}>
                            <NavLink
                                to={slug}
                                className={({ isActive }) =>
                                    `rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                                        isActive
                                            ? "bg-white/[0.07] text-white"
                                            : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                                    }`
                                }
                            >
                                {name}
                            </NavLink>
                        </li>
                    ))}

                    {/* Upload button */}
                    {isLoggedIn && (
                        <li>
                            <Button
                                type="button"
                                onClick={handleOpenImportModal}
                                className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 text-lg font-semibold text-white hover:bg-indigo-400"
                            >
                                +
                            </Button>
                        </li>
                    )}

                </ul>

                {/* Desktop actions */}
                <div className="hidden items-center gap-2 lg:flex">

                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard">
                                <Button className="rounded-md px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:text-white">
                                    Dashboard
                                </Button>
                            </Link>

                            <Button
                                onClick={handleLogout}
                                className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-slate-400 transition hover:border-white/20 hover:text-white"
                            >
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button className="rounded-md px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:text-white">
                                    Sign In
                                </Button>
                            </Link>

                            <Link to="/register">
                                <Button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 active:scale-[0.98]">
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}

                </div>

                {/* Mobile hamburger */}
                <Button
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/[0.06] hover:text-white lg:hidden"
                >
                    {menuOpen ? (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </Button>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="border-t border-white/[0.06] bg-[#0a0d17] px-6 pb-6 pt-4 lg:hidden">

                    <ul className="mb-5 space-y-0.5">

                        {publicNav.map(({ name, slug }) => (
                            <li key={slug}>
                                <NavLink
                                    to={slug}
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block rounded-md px-3.5 py-2.5 text-sm font-medium transition ${
                                            isActive
                                                ? "bg-white/[0.07] text-white"
                                                : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                                        }`
                                    }
                                >
                                    {name}
                                </NavLink>
                            </li>
                        ))}

                    </ul>

                    {/* Mobile upload */}
                    {isLoggedIn && (
                        <Button
                            type="button"
                            onClick={() => {
                                setMenuOpen(false);
                                setShowImportModal(true);
                            }}
                            className="mb-4 w-full rounded-lg bg-indigo-500 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400"
                        >
                            + Import File
                        </Button>
                    )}

                    <div className="flex flex-col gap-2.5 border-t border-white/[0.06] pt-5">

                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <Button className="w-full rounded-lg border border-white/10 py-2.5 text-center text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white">
                                        Dashboard
                                    </Button>
                                </Link>

                                <Button
                                    onClick={() => {
                                        handleLogout();
                                        setMenuOpen(false);
                                    }}
                                    className="w-full rounded-lg border border-white/10 py-2.5 text-sm font-medium text-slate-400 transition hover:text-white"
                                >
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <Button className="w-full rounded-lg border border-white/10 py-2.5 text-center text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white">
                                        Sign In
                                    </Button>
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <Button className="w-full rounded-lg bg-indigo-500 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-indigo-400">
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}

                    </div>
                </div>
            )}

            {/* Import PDF Modal */}
            {showImportModal && (
                <ImportFileModal
                    onClose={handleCloseImportModal}
                />
            )}

        </header>
    );
}