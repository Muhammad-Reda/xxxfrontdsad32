import React from "react";
import { NavLink } from "react-router-dom";
import "bulma/css/bulma.css";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import { isMobile } from "react-device-detect";
import logo from "./logo.png";

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <>
            <div className={isMobile ? "" : "fixed-top"}>
                <aside
                    className="main-sidebar  elevation-4"
                    style={
                        isMobile
                            ? { backgroundColor: "#098DB3", color: "white" }
                            : {
                                  backgroundColor: "#098DB3",
                                  color: "white",
                                  minHeight: "100vh",
                              }
                    }
                >
                    <ul className="navbar-nav">
                        <li>
                            <span
                                className="brand-link"
                                style={{ height: "70px" }}
                            >
                                <span className="brand-text font-weight-light">
                                    Posyandu
                                    {isMobile && (
                                        <i
                                            className="fa fa-times"
                                            style={{ marginLeft: "100px" }}
                                            data-widget="pushmenu"
                                            role="button"
                                        />
                                    )}
                                </span>
                            </span>
                        </li>
                    </ul>

                    <div className="sidebar">
                        <nav className="mt-2">
                            <img
                                src={logo}
                                alt="Logo"
                                className="sidebar-image"
                                style={{
                                    position: "absolute",
                                    bottom: "0",
                                    left: "0",
                                }}
                            />
                            <ul
                                className="nav  nav-sidebar flex-column"
                                data-widget="treeview"
                                role="menu"
                                data-accordion="false"
                            >
                                <li className="nav-item menu-open">
                                    <NavLink
                                        to="/dashboard"
                                        className="nav-link "
                                    >
                                        <i className="nav-icon fa fa-home" />
                                        <p>Beranda</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item menu-open">
                                    <NavLink
                                        to="/profile"
                                        className="nav-link "
                                    >
                                        <i className="nav-icon fa fa-user" />
                                        <p>Profile</p>
                                    </NavLink>
                                </li>

                                {user && user.status === "ketua" && (
                                    <li className="nav-item">
                                        <NavLink
                                            to="/akun"
                                            className="nav-link"
                                        >
                                            <i className="nav-icon fa fa-users" />
                                            <p>Pengelolaan Akun</p>
                                        </NavLink>
                                    </li>
                                )}

                                {user && user.status === "kader" && (
                                    <li className="nav-item">
                                        <NavLink
                                            to="/akun"
                                            className="nav-link"
                                        >
                                            <i className="nav-icon fa fa-users" />
                                            <p>Pengelolaan Akun</p>
                                        </NavLink>
                                    </li>
                                )}

                                {user && user.status === "kader" && (
                                    <li className="nav-item">
                                        <NavLink to="/ibu" className="nav-link">
                                            <i className="nav-icon fa fa-female" />
                                            <p>Pendataan Ibu</p>
                                        </NavLink>
                                    </li>
                                )}
                                {user && user.status === "ketua" && (
                                    <li className="nav-item">
                                        <NavLink
                                            to="/petugas"
                                            className="nav-link"
                                        >
                                            <i className="nav-icon fa fa-user-md" />
                                            <p>Pendataan Petugas</p>
                                        </NavLink>
                                    </li>
                                )}

                                {user && user.status === "kader" && (
                                    <li className="nav-item">
                                        <NavLink
                                            to="/bayi"
                                            className="nav-link"
                                        >
                                            <i className="nav-icon fas fa-edit" />
                                            <p>Pendataan Bayi/Balita</p>
                                        </NavLink>
                                    </li>
                                )}
                                {user && user.status === "kader" && (
                                    <li className="nav-item">
                                        <NavLink
                                            to="/perkembangan"
                                            className="nav-link"
                                        >
                                            <i className="nav-icon fa fa-plus-circle" />
                                            <p>Pendataan Perkembangan</p>
                                        </NavLink>
                                    </li>
                                )}

                                {user && user.status === "ibu" && (
                                    <li className="nav-item">
                                        <NavLink
                                            to={`/informasi/${user.noHp}`}
                                            className="nav-link"
                                        >
                                            <i className="nav-icon fa fa-plus-square" />
                                            <p>Informasi Perkembangan</p>
                                        </NavLink>
                                    </li>
                                )}

                                {user && user.status === "ketua" && (
                                    <li className="nav-item">
                                        <NavLink
                                            to="/informasi"
                                            className="nav-link"
                                        >
                                            <i className="nav-icon fa fa-plus-square" />
                                            <p>Informasi Perkembangan</p>
                                        </NavLink>
                                    </li>
                                )}
                                {user && user.status === "kader" && (
                                    <li className="nav-item">
                                        <NavLink
                                            to="/informasi"
                                            className="nav-link"
                                        >
                                            <i className="nav-icon fa fa-plus-square" />
                                            <p>Informasi Perkembangan</p>
                                        </NavLink>
                                    </li>
                                )}
                                {user && user.status === "bidan" && (
                                    <li className="nav-item">
                                        <NavLink
                                            to="/informasi"
                                            className="nav-link"
                                        >
                                            <i className="nav-icon fa fa-plus-square" />
                                            <p>Informasi Perkembangan</p>
                                        </NavLink>
                                    </li>
                                )}

                                {user && user.status === "ketua" && (
                                    <li className="nav-item">
                                        <NavLink
                                            to="/berita"
                                            className="nav-link"
                                        >
                                            <i className="nav-icon fa fa-info" />
                                            <p>Informasi Posyandu</p>
                                        </NavLink>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </aside>
            </div>
        </>
    );
};

export default Sidebar;
