import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "../components/DaftarKader.css";
import jsPDF from "jspdf";
import IbuModel from "../model/IbuModel";
import autoTable from "jspdf-autotable";

const PendataanIbu = () => {
    const [ibu, setIbu] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [ibuDiHapus, setIbuDiHapus] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [msg, setMsg] = useState("");

    function handleConfirm() {
        hapusIbu(ibuDiHapus);
        setIsModalOpen(false);
    }

    function handleClick(nik) {
        setIbuDiHapus(nik);
        setIsModalOpen(true);
    }

    function tutup() {
        setMsg("");
        tampilSemuaIbu();
    }

    useEffect(() => {
        tampilSemuaIbu();
    }, [page, keyword]);

    const tampilSemuaIbu = async () => {
        const data = await IbuModel.muatSemuaIbu(keyword, page, limit);
        setIbu(data.response);
        setPage(data.page);
        setPages(data.totalPage);
        setRows(data.totalRows);
        // console.log(data);
    };

    const hapusIbu = async (nik) => {
        await IbuModel.hapusIbu(nik);
        setMsg("Data berhasil dihapus");
        setTimeout(() => {
            setMsg("");
            tampilSemuaIbu();
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
        doc.text("Data Ibu", 130, 10);
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
                { title: "RT", field: "rt", dataKey: "rt" },
                { title: "RW", field: "rw", dataKey: "rw" },
                { title: "Agama", field: "agama", dataKey: "agama" },
                {
                    title: "Jumlah Anak",
                    field: "jumlah anak",
                    dataKey: "jumlahAnak",
                },
                { title: "NO HP", field: "no hp", dataKey: "akunNoHp" },
            ],
            body: ibu.map((data, index) => [
                index + 1,
                data.nik,
                data.nama,
                data.tempatLahir,
                data.tanggalLahirBaru,
                data.alamat,
                data.rt,
                data.rw,
                data.agama,
                data.jumlahAnak,
                "+62" + data.akunNoHp,
            ]),
        });

        doc.save("ibu.pdf");
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
                    className="title"
                    style={{ textAlign: "center", marginTop: " 20px" }}
                >
                    Ibu
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
                                    to="/ibu/add"
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
                                    placeholder="Cari Nama"
                                />
                            </div>
                            <div className="control">
                                <button
                                    className="button is-info"
                                    style={{ marginRight: "10px" }}
                                >
                                    <i className="fa fa-search" />
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
                </div>
                <div
                    className="table-ibu"
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                >
                    <Table
                        className="table table-responsive table-responsive-sm is-bordered"
                        style={{ width: "100%" }}
                    >
                        <thead className="thead-light">
                            <tr>
                                <th className="text-center">No</th>
                                <th className="text-center">NIK</th>
                                <th className="text-center">nama</th>
                                <th className="text-center">Tempat Lahir</th>
                                <th className="text-center">Tanggal Lahir</th>
                                <th className="text-center">Alamat</th>
                                <th className="text-center">RT</th>
                                <th className="text-center">RW</th>
                                <th className="text-center">Agama</th>
                                <th className="text-center">Jumlah Anak</th>
                                <th className="text-center">No HP</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ibu.map((ibu, index) => (
                                <tr key={ibu.nik}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{ibu.nik}</td>
                                    <td className="text-center">{ibu.nama}</td>
                                    <td className="text-center">
                                        {ibu.tempatLahir}
                                    </td>
                                    <td className="text-center">
                                        {ibu.tanggalLahirBaru}
                                    </td>
                                    <td className="text-center">
                                        {ibu.alamat}
                                    </td>
                                    <td className="text-center">{ibu.rt}</td>
                                    <td className="text-center">{ibu.rw}</td>
                                    <td className="text-center">{ibu.agama}</td>
                                    <td className="text-center">
                                        {ibu.jumlahBayi}
                                    </td>
                                    <td className="text-center">
                                        {ibu.akunNoHp}
                                    </td>

                                    <td>
                                        <button
                                            onClick={() => handleClick(ibu.nik)}
                                            className="button is-small is-danger"
                                            style={{ marginRight: "10px " }}
                                        >
                                            Hapus
                                        </button>
                                        <Link
                                            to={`/ibu/edit/${encodeURIComponent(
                                                ibu.nik
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
                            Rows : {rows} Page: {rows ? page + 1 : 0} of {pages}
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
                            activeLinkClassName={"pagination-link is-current "}
                            disabledLinkClassName={"pagination-link"}
                        />
                    </nav>
                </div>
            </div>
        </>
    );
};

export default PendataanIbu;
