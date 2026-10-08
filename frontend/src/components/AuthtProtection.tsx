import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type ProtectionProps = {
    children: React.ReactNode;
    authentication: boolean;
};

export default function Protection({ children, authentication }: ProtectionProps) {
    const navigate   = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state: any) => state.auth.status);

    useEffect(() => {
        if (authentication && authStatus === false) navigate("/login");
        if (!authentication && authStatus === true)  navigate("/");
        setLoader(false);
    }, [authStatus, authentication, navigate]);

    if (loader) {
        return (
            <div
                style={{ background: "var(--bg-base)" }}
                className="flex min-h-screen items-center justify-center"
            >
                <span className="cs-spinner" />
            </div>
        );
    }

    return <>{children}</>;
}
