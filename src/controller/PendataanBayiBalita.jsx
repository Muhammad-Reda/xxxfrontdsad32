import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "../components/DaftarAkun.css";
import ReactPaginate from "react-paginate";
import "../components/DaftarKader.css";
import jsPDF from "jspdf";
import BayiBalitaModel from "../model/BayiBalitaModel";
import autoTable from "jspdf-autotable";

const PendataanBayiBalita = () => {
    const [bayi, setBayi] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [bayiDiHapus, setBayiDiHapus] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [msg, setMsg] = useState("");

    function handleConfirm() {
        hapusBayiBalita(bayiDiHapus);
        setIsModalOpen(false);
    }

    function handleClick(id) {
        setBayiDiHapus(id);
        setIsModalOpen(true);
    }

    function tutup() {
        setMsg("");
        tampilSemuaBayiBalita();
    }

    useEffect(() => {
        tampilSemuaBayiBalita();
    }, [page, keyword]);

    const tampilSemuaBayiBalita = async () => {
        const data = await BayiBalitaModel.muatSemuaBayiBalita(
            keyword,
            page,
            limit
        );
        setBayi(data.response);
        setPage(data.page);
        setPages(data.totalPage);
        setRows(data.totalRows);
    };

    const hapusBayiBalita = async (id) => {
        await BayiBalitaModel.hapusBayiBalita(id);
        setMsg("Data berhasil dihapus");
        setTimeout(() => {
            setMsg("");
            tampilSemuaBayiBalita();
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
        doc.text("Data Bayi/Balita", 130, 10);
        doc.autoTable({
            columns: [
                { title: "No", field: "no", dataKey: "no" },
                { title: "ID", field: "id", dataKey: "id" },
                { title: "NIK Ibu", field: "ibuNik", dataKey: "ibuNik" },
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
                {
                    title: "Jenis Kelamin",
                    field: "jenisKelamin",
                    dataKey: "jenisKelamin",
                },
                {
                    title: "Berat Lahir",
                    field: "beratLahir",
                    dataKey: "beratLahir",
                },
                {
                    title: "Panjang Lahir",
                    field: "panjangLahir",
                    dataKey: "panjangLahir",
                },
                {
                    title: "Kondisi Persalinan",
                    field: "kondisiPersalinan",
                    dataKey: "kondisiPersalinan",
                },
                {
                    title: "Anak ke",
                    field: "anakKe",
                    dataKey: "anakKe",
                },
            ],
            body: bayi.map((data, index) => [
                index + 1,
                data.id,
                data.ibuNik,
                data.nama,
                data.tanggalLahir,
                data.tanggalLahirBaru,
                data.jenisKelamin,
                data.beratLahir,
                data.panjangLahir,
                data.kondisiPersalinan,
                data.anakKe,
            ]),
        });

        doc.save("bayi.pdf");
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
                    DATA BAYI/BALITA
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
                                    to="/bayi/add"
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
                </div>

                <div
                    className="table-bayi"
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                >
                    <Table
                        className="table table-responsive table-responsive-sm is-bordered"
                        style={{ width: "100%" }}
                    >
                        <thead className="thead-light">
                            <tr>
                                <th className="text-center">No</th>
                                <th className="text-center">Id</th>
                                <th className="text-center">NIK Ibu</th>
                                <th className="text-center">Nama</th>
                                <th className="text-center">Tempat Lahir</th>
                                <th className="text-center">Tanggal Lahir</th>
                                <th className="text-center">Jenis Kelamin</th>
                                <th className="text-center">berat Lahir</th>
                                <th className="text-center">Panjang Lahir</th>
                                <th className="text-center">
                                    Kondisi Persalinan
                                </th>
                                <th className="text-center">Anak Ke</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bayi.map((bayi, index) => (
                                <tr key={bayi.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{bayi.id}</td>
                                    <td className="text-center">
                                        {bayi.ibuNik}
                                    </td>
                                    <td className="text-center">{bayi.nama}</td>
                                    <td className="text-center">
                                        {bayi.tempatLahir}
                                    </td>
                                    <td className="text-center">
                                        {bayi.tanggalLahirBaru}
                                    </td>
                                    <td className="text-center">
                                        {bayi.jenisKelamin}
                                    </td>
                                    <td className="text-center">
                                        {bayi.beratLahir}
                                    </td>
                                    <td className="text-center">
                                        {bayi.panjangLahir}
                                    </td>
                                    <td className="text-center">
                                        {bayi.kondisiPersalinan}
                                    </td>
                                    <td className="text-center">
                                        {bayi.anakKe}
                                    </td>

                                    <td>
                                        <button
                                            onClick={() => handleClick(bayi.id)}
                                            className="button is-small is-danger"
                                            style={{ marginRight: "10px " }}
                                        >
                                            Hapus
                                        </button>
                                        <Link
                                            to={`/bayi/edit/${encodeURIComponent(
                                                bayi.id
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

export default PendataanBayiBalita;
