import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "../components/DaftarAkun.css";
import { isMobile } from "react-device-detect";
import ReactPaginate from "react-paginate";
import AkunModel from "../model/AkunModel";

const PengelolaanAkun = () => {
    const [akun, setAkun] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [akunDiHapus, setAkunDiHapus] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [msg, setMsg] = useState("");

    function handleConfirm() {
        hapusAkun(akunDiHapus);
        setIsModalOpen(false);
    }

    function handleClick(noHp) {
        // e.preventDefault();
        // Tampilkan pop up konfirmasi sebelum mengeksekusi function
        setAkunDiHapus(noHp);
        setIsModalOpen(true);
    }

    useEffect(() => {
        tampilSemuaAkun();
    }, [page, keyword, limit]);

    function tutup() {
        setMsg("");
        tampilSemuaAkun();
    }

    const tampilSemuaAkun = async () => {
        const data = await AkunModel.muatSemuaAKun(keyword, page, limit);
        setAkun(data.response);
        setPage(data.page);
        setPages(data.totalPage);
        setRows(data.totalRows);
    };

    const hapusAkun = async (noHp) => {
        await AkunModel.hapusAkun(noHp);
        setMsg("Akun berhasil dihapus");
        setTimeout(() => {
            setMsg("");
            tampilSemuaAkun();
        }, 2000);
    };

    const changePage = ({ selected }) => {
        setPage(selected);
    };

    const searchData = (e) => {
        e.preventDefault();
        setPage(0);
        setKeyword(query);
    };

    const aturLimit = (e) => {
        e.preventDefault();
        setLimit(limit);
    };

    return (
        <>
            {msg && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">
                                <i
                                    className="nav-icon fas fa-info"
                                    style={{ fontSize: "15px" }}
                                />
                            </p>
                        </header>
                        <section className="modal-card-body">
                            <p>{msg}</p>
                        </section>
                        <footer className="modal-card-foot">
                            <button
                                className="button is-primary"
                                onClick={tutup}
                            >
                                OK
                            </button>
                        </footer>
                    </div>
                </div>
            )}
            {isModalOpen && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Konfirmasi Aksi</p>
                        </header>
                        <section className="modal-card-body">
                            <p>Apakah anda yakin ingin melanjutkan aksi ini?</p>
                        </section>
                        <footer className="modal-card-foot">
                            <button
                                onClick={handleConfirm}
                                className="button is-primary"
                            >
                                OK
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="button"
                            >
                                Cancel
                            </button>
                        </footer>
                    </div>
                </div>
            )}

            <div>
                <h1
                    className="title "
                    style={{ textAlign: "center", marginTop: " 20px" }}
                >
                    Akun
                </h1>

                <div className="container">
                    <form onSubmit={searchData} style={{ padding: "10px" }}>
                        <div className="field has-addons">
                            <div
                                className="control"
                                style={{
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                }}
                            >
                                <Link
                                    to="/akun/add"
                                    className="button is-primary"
                                >
                                    <i
                                        className="fa fa-user-plus"
                                        aria-hidden="true"
                                    ></i>
                                </Link>
                            </div>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Cari Username"
                                />
                            </div>
                            <div className="control">
                                <button
                                    className="button is-info"
                                    style={{ marginRight: "10px" }}
                                >
                                    Cari
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="table-akun">
                        <Table
                            className={
                                isMobile
                                    ? "table-responsive is-bordered text-center"
                                    : "table is-bordered text-center"
                            }
                            style={{ width: "100%" }}
                        >
                            <thead className="thead-light">
                                <tr>
                                    <th className=" text-center">No</th>
                                    <th className=" text-center">No Hp</th>
                                    <th className=" text-center">Username</th>
                                    <th className=" text-center">Status</th>
                                    <th className=" text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {akun.map((akun, index) => (
                                    <tr key={akun.noHp}>
                                        <td
                                            style={{
                                                padding: "10px",
                                            }}
                                        >
                                            {index + 1}
                                        </td>
                                        <td className="isi">0{akun.noHp}</td>
                                        <td className="isi">{akun.username}</td>
                                        <td className="isi">{akun.status}</td>
                                        <td className="isi">
                                            {akun.status !== "ketua" && (
                                                <button
                                                    onClick={() =>
                                                        handleClick(akun.noHp)
                                                    }
                                                    className="button is-small is-danger"
                                                    style={{ padding: "10px " }}
                                                >
                                                    Hapus
                                                </button>
                                            )}
                                            <Link
                                                to={`/akun/edit/${encodeURIComponent(
                                                    akun.noHp
                                                )}`}
                                                className="button is-small is-info"
                                                style={{ marginLeft: "10px" }}
                                            >
                                                Ubah
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div>
                            <p>
                                Rows : {rows} Page: {rows ? page + 1 : 0} of{" "}
                                {pages}
                            </p>
                            <form
                                onSubmit={aturLimit}
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <label className="label mr-3 mt-1">Limit</label>
                                <div className="control">
                                    <div className="select is-half mt-1">
                                        <select
                                            value={limit}
                                            onChange={(e) =>
                                                setLimit(e.target.value)
                                            }
                                        >
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="">Semua</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <nav
                            className="pagination is-centered"
                            key={rows}
                            role="navigation"
                            aria-label="pagination"
                        >
                            <ReactPaginate
                                previousLabel={"< Prev"}
                                nextLabel={"Next >"}
                                pageCount={pages}
                                onPageChange={changePage}
                                containerClassName={"pagination-list"}
                                pageLinkClassName={"pagination-link"}
                                previousLinkClassName={"pagination-previous"}
                                nextLinkClassName={"pagination-next"}
                                activeLinkClassName={
                                    "pagination-link is-current "
                                }
                                disabledLinkClassName={"pagination-link"}
                            />
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PengelolaanAkun;
