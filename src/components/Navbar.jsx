import React from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.css";
import { useDispatch } from "react-redux";
import { logOUt, reset } from "../features/AuthSlice";
import { isMobile } from "react-device-detect";

const Navbar = () => {
    const dispacth = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispacth(logOUt());
        dispacth(reset());
        navigate("/");
    };
    return (
        <nav
            className="main-header navbar navbar-expand  navbar-light fixed-top"
            style={{ backgroundColor: "#D9D9D9", zIndex: "999" }}
        >
            <ul className="navbar-nav">
                <li className="nav-item">
                    <span
                        className="nav-link"
                        data-widget="pushmenu"
                        role="button"
                    >
                        <i className="fas fa-bars" />
                    </span>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <div className="navbar-search-block">
                        <form className="form-inline">
                            <div className="input-group input-group-sm">
                                <input
                                    className="form-control form-control-navbar"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-navbar"
                                        type="submit"
                                    >
                                        <i className="fas fa-search" />
                                    </button>
                                    <button
                                        className="btn btn-navbar"
                                        type="button"
                                        data-widget="navbar-search"
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>

                <div
                    className="dropdown"
                    style={
                        isMobile
                            ? { marginRight: "20px" }
                            : { marginRight: "80px" }
                    }
                >
                    <button
                        className="btn"
                        type="button"
                        data-toggle="dropdown"
                    >
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </button>
                    <div
                        className="dropdown-menu"
                        style={{ width: "auto", minWidth: "fit-content" }}
                    >
                        <span className="dropdown-item " onClick={logout}>
                            Logout
                        </span>
                    </div>
                </div>

                {/* <li className="nav-item">
                    <a
                        className="nav-link"
                        data-widget="fullscreen"
                        href="#"
                        role="button"
                    >
                        <i className="fas fa-expand-arrows-alt" />
                    </a>
                </li> */}
            </ul>
        </nav>
    );
};

export default Navbar;
