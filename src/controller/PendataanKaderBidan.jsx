import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "../components/DaftarAkun.css";
import ReactPaginate from "react-paginate";
import "../components/DaftarKader.css";
import jsPDF from "jspdf";
import KaderBidanModel from "../model/KaderBidanModel";
import autoTable from "jspdf-autotable";

const PendataanKaderBidan = () => {
    const [kaderBidan, setKaderBindan] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [petugasDiHapus, setPetugasDiHapus] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [msg, setMsg] = useState("");

    function handleConfirm() {
        hapusKaderBidan(petugasDiHapus);
        setIsModalOpen(false);
    }

    function tutup() {
        setMsg("");
        tampilSemuaKaderBidan();
    }

    function handleClick(nik) {
        setPetugasDiHapus(nik);
        setIsModalOpen(true);
    }

    useEffect(() => {
        tampilSemuaKaderBidan();
    }, [page, keyword]);

    const tampilSemuaKaderBidan = async () => {
        const data = await KaderBidanModel.muatSemuaKaderBidan(
            keyword,
            page,
            limit
        );
        setKaderBindan(data.response);
        setPage(data.page);
        setPages(data.totalPage);
        setRows(data.totalRows);
    };

    const hapusKaderBidan = async (nik) => {
        await KaderBidanModel.hapusKaderBidan(nik);
        setMsg("Data berhasil dihapus");
        setTimeout(() => {
            setMsg("");
            tampilSemuaKaderBidan();
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

    const pdf = () => {
        const doc = new jsPDF({
            orientation: "landscape",
        });
        doc.text("Data Kader/Bidan", 120, 10);
        doc.autoTable({
            columns: [
                { title: "No", field: "no", dataKey: "no" },
                { title: "NIK", field: "nik", dataKey: "nik" },
                { title: "Nama", field: "nama", dataKey: "nama" },
                {
                    title: "Tempat Lahir",
                    field: "tempat lahir",
                    dataKey: "tempatLahir",
                },
                {
                    title: "Tanggal Lahir",
                    field: "tanggal lahir",
                    dataKey: "tanggalLahirBaru",
                },
                { title: "Alamat", field: "alamat", dataKey: "alamat" },
                { title: "Agama", field: "agama", dataKey: "agama" },
                { title: "Status", field: "status", dataKey: "status" },
                { title: "Jabatan", field: "jabatan", dataKey: "jabatan" },
                {
                    title: "Periode Kerja Mulai",
                    field: "periode kerja mulai",
                    dataKey: "periodeKerjaMulaiBaru",
                },
                {
                    title: "Periode Kerja Berakhir",
                    field: "periode kerja berakhir",
                    dataKey: "periodeKerjaBerakhirBaru",
                },
                { title: "NO HP", field: "no hp", dataKey: "akunNoHp" },
            ],
            body: kaderBidan.map((data, index) => [
                index + 1,
                data.nik,
                data.nama,
                data.tempatLahir,
                data.tanggalLahirBaru,
                data.alamat,
                data.agama,
                data.status,
                data.jabatan,
                data.periodeKerjaMulaiBaru,
                data.periodeKerjaBerakhirBaru,
                "+62" + data.akunNoHp,
            ]),
        });

        doc.save("kaderbidan.pdf");
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
                    KADER/BIDAN
                </h1>
                <div className="container">
                    <form onSubmit={searchData} style={{ padding: "5px" }}>
                        <div className="field has-addons">
                            <div
                                className="control"
                                style={{
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                }}
                            >
                                <Link
                                    to="/petugas/add"
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
                            <div className="control">
                                <button
                                    className="button is-info"
                                    style={{ marginRight: "10px" }}
                                    onClick={pdf}
                                >
                                    <i
                                        className="fa fa-download"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="table-petugas">
                        <Table
                            className="table table-responsive table-responsive-sm is-bordered"
                            style={{ width: "100%" }}
                        >
                            <thead className="thead-light">
                                <tr>
                                    <th className="text-center">No</th>
                                    <th className="text-center">NIK</th>
                                    <th className="text-center">Nama</th>
                                    <th className="text-center">
                                        Tempat Lahir
                                    </th>
                                    <th className="text-center">
                                        Tanggal Lahir
                                    </th>
                                    <th className="text-center">Alamat</th>
                                    <th className="text-center">Agama</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Jabatan</th>
                                    <th className="text-center">
                                        Periode Kerja Mulai
                                    </th>
                                    <th className="text-center">
                                        Periode Kerja Berakhir
                                    </th>
                                    <th className="text-center">No Hp</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kaderBidan.map((kaderBidan, index) => (
                                    <tr key={kaderBidan.nik}>
                                        <td className="text-center">
                                            {index + 1}
                                        </td>
                                        <td className="text-center">
                                            {kaderBidan.nik}
                                        </td>
                                        <td className="text-center">
                                            {kaderBidan.nama}
                                        </td>
                                        <td className="text-center">
                                            {kaderBidan.tempatLahir}
                                        </td>
                                        <td className="text-center">
                                            {kaderBidan.tanggalLahirBaru}
                                        </td>
                                        <td className="text-center">
                                            {kaderBidan.alamat}
                                        </td>
                                        <td className="text-center">
                                            {kaderBidan.agama}
                                        </td>
                                        <td className="text-center">
                                            {" "}
                                            {kaderBidan.status}
                                        </td>
                                        <td className="text-center">
                                            {kaderBidan.jabatan}
                                        </td>
                                        <td className="text-center">
                                            {kaderBidan.periodeKerjaMulaiBaru}
                                        </td>
                                        <td className="text-center">
                                            {
                                                kaderBidan.periodeKerjaBerakhirBaru
                                            }
                                        </td>
                                        <td className="text-center">
                                            0{kaderBidan.akunNoHp}
                                        </td>

                                        <td>
                                            <button
                                                onClick={() =>
                                                    handleClick(kaderBidan.nik)
                                                }
                                                className="button is-small is-danger"
                                                style={{ marginRight: "10px " }}
                                            >
                                                Hapus
                                            </button>
                                            <Link
                                                to={`/petugas/edit/${encodeURIComponent(
                                                    kaderBidan.nik
                                                )}`}
                                                className="button is-small is-info"
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
                                <label className="label mr-3  mt-1">
                                    Limit
                                </label>
                                <div className="control">
                                    <div className="select is-half  mt-1">
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

export default PendataanKaderBidan;
