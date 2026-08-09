import { NavLink, Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <nav className="border-gray-200 px-4 lg:px-6 py-3">
                <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center space-x-2"
                    >
                        <img
                            src="/logo.png"
                            className="h-10 w-10"
                            alt="CodeSentinel Logo"
                        />
                        <span className="text-2xl font-bold text-blue-600">
                            CodeSentinel
                        </span>
                    </Link>

                    {/* Buttons */}
                    <div className="flex items-center lg:order-2 space-x-3">

                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-blue-600 font-medium duration-200"
                        >
                            Log in
                        </Link>

                        <Link
                            to="/register"
                            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 duration-200"
                        >
                            Get Started
                        </Link>

                    </div>

                    {/* Navigation */}
                    <div className="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto">

                        <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">

                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive? "text-blue-600": "text-gray-700 hover:text-blue-600"}`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/features"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${
                                            isActive
                                                ? "text-blue-600"
                                                : "text-gray-700 hover:text-blue-600"
                                        }`
                                    }
                                >
                                    Features
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/pricing"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${
                                            isActive
                                                ? "text-blue-600"
                                                : "text-gray-700 hover:text-blue-600"
                                        }`
                                    }
                                >
                                    Pricing
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${
                                            isActive
                                                ? "text-blue-600"
                                                : "text-gray-700 hover:text-blue-600"
                                        }`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>

                        </ul>

                    </div>

                </div>
            </nav>
        </header>
    );
}