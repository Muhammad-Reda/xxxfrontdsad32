import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <div className="wrapper">
            <Navbar />
            <Sidebar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
