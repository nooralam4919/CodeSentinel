import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type ProtectionProps = {
    children: React.ReactNode;
    authentication: boolean;
};

export default function Protection({children,authentication,}: ProtectionProps) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)

    const authStatus = useSelector(
        (state: any) => state.auth.status
    );

    useEffect(() => {
        if (authentication && authStatus !== !authentication) {
            navigate("/login");
        }

        if (!authentication && authStatus !== authentication) {
            navigate("/HomePage");
        }
        setLoader(false)
    }, [authStatus, authentication, navigate]);

    return loader ? <h1>Loading...</h1>  : <>{children}</>;
}