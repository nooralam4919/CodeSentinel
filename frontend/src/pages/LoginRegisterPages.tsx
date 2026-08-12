import { Link } from "react-router-dom";

export default function LoginRegisterPages() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] p-4 md:p-7">
      <div className="relative mx-auto min-h-[calc(100vh-2rem)] max-w-[1200px] overflow-hidden rounded-[22px] bg-black text-white md:min-h-[calc(100vh-3.5rem)]">

        {/* Background shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          
          {/* Top-left diagonal shape */}
          <div
            className="
              absolute -left-[8%] -top-[15%]
              h-[65%] w-[75%]
              rotate-[31deg]
              bg-gradient-to-br
              from-[#151515]
              via-[#080808]
              to-black
              opacity-90
            "
          />

          {/* Center diagonal shape */}
          <div
            className="
              absolute left-[25%] -top-[20%]
              h-[125%] w-[28%]
              rotate-[31deg]
              bg-gradient-to-r
              from-[#171717]
              via-[#080808]
              to-black
              opacity-90
            "
          />

          {/* Bottom-right shape */}
          <div
            className="
              absolute -bottom-[30%] right-[4%]
              h-[80%] w-[65%]
              rotate-[31deg]
              bg-gradient-to-br
              from-[#171717]
              via-[#080808]
              to-black
              opacity-90
            "
          />

          {/* Soft glow */}
          <div
            className="
              absolute left-1/2 top-1/2
              h-[450px] w-[450px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white/[0.025]
              blur-[100px]
            "
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-[calc(100vh-2rem)] flex-col md:min-h-[calc(100vh-3.5rem)]">

          {/* Navbar */}
          <header className="flex items-center justify-between px-5 py-4 md:px-8 md:py-5">

            {/* Logo */}
            <div className="text-lg font-medium tracking-tight md:text-xl">
              CodeSentinel
            </div>

            {/* Login & Register */}
            <div className="flex items-center gap-3">

              <Link
                to="/login"
                className="
                  rounded-md
                  border border-white/30
                  bg-white/[0.03]
                  px-4 py-1.5
                  text-[11px]
                  text-white
                  transition
                  hover:bg-white/10
                "
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="
                  rounded-md
                  bg-white
                  px-4 py-1.5
                  text-[11px]
                  font-medium
                  text-black
                  transition
                  hover:bg-gray-200
                "
              >
                Register
              </Link>

            </div>
          </header>

          {/* Hero */}
          <section className="flex flex-1 items-center justify-center px-5 pb-16 pt-20 text-center md:pb-24 md:pt-10">

            <div className="mx-auto max-w-[650px]">

              {/* Announcement */}
              <div
                className="
                  mb-8
                  inline-flex
                  cursor-pointer
                  items-center
                  rounded-full
                  border border-white/30
                  bg-white/[0.02]
                  px-4 py-2
                  text-[10px]
                  text-gray-300
                  backdrop-blur-sm
                  transition
                  hover:border-white/50
                  hover:bg-white/[0.05]
                "
              >
                CodeSentinel is now available
                <span className="ml-2">→</span>
              </div>

              {/* Heading */}
              <h1
                className="
                  text-4xl
                  font-semibold
                  leading-[1.05]
                  tracking-[-0.04em]
                  md:text-6xl
                  lg:text-[64px]
                "
              >
                Secure your code
                <br />
                with confidence
              </h1>

              {/* Description */}
              <p
                className="
                  mx-auto
                  mt-6
                  max-w-[480px]
                  text-xs
                  leading-5
                  text-gray-400
                  md:text-sm
                "
              >
                Analyze your codebase, detect security vulnerabilities,
                and understand how to fix them before they reach production.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex items-center justify-center gap-7">

                <Link
                  to="/register"
                  className="
                    rounded-md
                    bg-[#6d3df5]
                    px-5 py-2.5
                    text-xs
                    font-medium
                    text-white
                    shadow-[0_0_30px_rgba(109,61,245,0.25)]
                    transition
                    hover:bg-[#7b4cff]
                  "
                >
                  Get started
                </Link>

                <button
                  type="button"
                  className="
                    text-xs
                    text-gray-300
                    transition
                    hover:text-white
                  "
                >
                  Live demo
                  <span className="ml-1">→</span>
                </button>

              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}