import React, { Component } from "react";

export default class Menu extends Component {
    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a className="brand-link">
                    <span className="brand-text font-weight-light">
                        Posyandu Benih Gemilang
                    </span>
                </a>
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="info">
                            <p style={{ color: "white" }}>
                                <i className="far fa fa-user ml-2 mr-3" />
                                Alexander Pierce
                            </p>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul
                            className="nav nav-pills nav-sidebar flex-column"
                            data-widget="treeview"
                            role="menu"
                            data-accordion="false"
                        >
                            <li className="nav-item menu-open">
                                <a href="#" className="nav-link active">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>Dashboard</p>
                                </a>
                                <ul className="nav nav-treeview"></ul>
                            </li>

                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fa fa-user" />
                                    <p>Pengelolaan Akun</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fas fa-edit" />
                                    <p>
                                        Pendataan
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <a
                                            href="pages/forms/general.html"
                                            className="nav-link"
                                        >
                                            <i className="far fa-circle nav-icon" />
                                            <p>Ibu</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="pages/forms/advanced.html"
                                            className="nav-link"
                                        >
                                            <i className="far fa-circle nav-icon" />
                                            <p>Bayi/Balita</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="pages/forms/editors.html"
                                            className="nav-link"
                                        >
                                            <i className="far fa-circle nav-icon" />
                                            <p>Kader/Bidan</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon fa fa-info" />
                                    <p>
                                        Informasi
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <a
                                            href="pages/mailbox/mailbox.html"
                                            className="nav-link"
                                        >
                                            <i className="far fas fa-chart-pie ml-1" />
                                            <p className="ml-2">
                                                Perkembangan Bayi
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="pages/mailbox/compose.html"
                                            className="nav-link"
                                        >
                                            <i className="far fa-circle nav-icon" />
                                            <p>Posyandu</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }
}
