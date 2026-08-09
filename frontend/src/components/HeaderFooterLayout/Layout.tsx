import Header from "../layout/Header.tsx";
import Footer from "../layout/Footer.tsx";
import {Outlet} from "react-router-dom";

function Layout () {
    return(
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;
