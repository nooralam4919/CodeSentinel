import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type ProtectionProps = {
    children: React.ReactNode;
    authentication: boolean; // true = protected (must be logged in), false = guest-only
};

export default function Protection({ children, authentication }: ProtectionProps) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    const authStatus = useSelector((state: any) => state.auth.status);

    useEffect(() => {
        // BUG FIX 1: Original condition was `authStatus !== !authentication`
        // which is the same as `authStatus !== false` when authentication=true,
        // meaning it only redirected when the user WAS logged in — completely backwards.
        //
        // Correct logic:
        // - Route requires login (authentication=true) AND user is not logged in → go to /login
        if (authentication && authStatus === false) {
            navigate("/login");
        }

        // - Route is guest-only (authentication=false) AND user IS logged in → go to dashboard
        // BUG FIX 2: Was navigating to "/HomePage" which is not a registered route.
        // The home route is "/" so logged-in users get redirected there.
        if (!authentication && authStatus === true) {
            navigate("/");
        }

        setLoader(false);
    }, [authStatus, authentication, navigate]);

    return loader ? (
        <div className="flex min-h-screen items-center justify-center bg-[#0a0d17]">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-indigo-400" />
        </div>
    ) : (
        <>{children}</>
    );
}
