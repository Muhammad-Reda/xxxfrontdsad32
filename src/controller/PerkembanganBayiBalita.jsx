import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "../components/DaftarKader.css";
import jsPDF from "jspdf";
import PerkembanganBayiBalitaModel from "../model/PerkembanganBayiBalitaModel";
import autoTable from "jspdf-autotable";

const PerkembanganBayiBalita = () => {
    const [perkembangan, setPerkembangan] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [perkembanganDiHapus, setPerkebanganDiHapus] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [msg, setMsg] = useState("");

    function handleConfirm() {
        hapusPerkembanganBayiBalita(perkembanganDiHapus);
        setIsModalOpen(false);
    }

    function handleClick(id) {
        setPerkebanganDiHapus(id);
        setIsModalOpen(true);
    }

    function tutup() {
        setMsg("");
        tampilSemuaPerkembanganBayiBalita();
    }

    useEffect(() => {
        tampilSemuaPerkembanganBayiBalita();
    }, [page, keyword]);

    const tampilSemuaPerkembanganBayiBalita = async () => {
        const data =
            await PerkembanganBayiBalitaModel.muatSemuaPerkembanganBayiBalita(
                keyword,
                page,
                limit
            );
        setPerkembangan(data.response);
        setPage(data.page);
        setPages(data.totalPage);
        setRows(data.totalRows);
    };

    const hapusPerkembanganBayiBalita = async (id) => {
        await PerkembanganBayiBalitaModel.hapusPerkembanganBayiBalita(id);
        setMsg("Data berhasil dihapus");
        setTimeout(() => {
            setMsg("");
            tampilSemuaPerkembanganBayiBalita();
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
        doc.text("Perkembangan Bayi/Balita", 130, 10);
        doc.autoTable({
            columns: [
                { title: "No", field: "no", dataKey: "no" },
                { title: "ID", field: "id", dataKey: "id" },
                { title: "ID Bayi/Balita", field: "bayiId", dataKey: "bayiId" },
                {
                    title: "Nama Bayi/Balita",
                    field: "nama",
                    dataKey: "nama",
                },
                {
                    title: "Tanggal Pemeriksaan",
                    field: "tanggalPemeriksaanBaru",
                    dataKey: "tanggalPemeriksaanBaru",
                },
                {
                    title: "Berat Badan",
                    field: "beratBadan",
                    dataKey: "beratBadan",
                },
                {
                    title: "Tinggi Badan",
                    field: "tinggiBadan",
                    dataKey: "tinggiBadan",
                },
                {
                    title: "Lingkar Kepala",
                    field: "lingkarKepala",
                    dataKey: "lingkarKepala",
                },
                {
                    title: "Imunisasi",
                    field: "imunisasi",
                    dataKey: "agimunisasiama",
                },
                {
                    title: "Vitamin A",
                    field: "vitaminA",
                    dataKey: "vitaminA",
                },
            ],
            body: perkembangan.map((data, index) => [
                index + 1,
                data.id,
                data.bayiId,
                data.nama,
                data.tanggalPemeriksaanBaru,
                data.beratBadan,
                data.tinggiBadan,
                data.lingkarKepala,
                data.imunisasi,
                data.vitaminA,
            ]),
        });

        doc.save("perkembangan.pdf");
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
                    PERKEMBANGAN BAYI/BALITA
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
                                    to="/perkembangan/add"
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
                    className="table-perkembangan"
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                >
                    <Table
                        className="table table-responsive table-responsive-sm is-bordered"
                        style={{ width: "100%" }}
                    >
                        <thead className="thead-light">
                            <tr>
                                <th className="text-center">No</th>
                                <th className="text-center">ID</th>
                                <th className="text-center">ID Bayi</th>
                                <th className="text-center">Nama Bayi</th>
                                <th className="text-center">
                                    Tanggal Pemeriksaan
                                </th>
                                <th className="text-center">Berat Badan</th>
                                <th className="text-center">Tinggi Badan</th>
                                <th className="text-center">Lingkar Kepala</th>
                                <th className="text-center">Imunisasi</th>
                                <th className="text-center">Vitamin A</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {perkembangan.map((perkembangan, index) => (
                                <tr key={perkembangan.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">
                                        {perkembangan.id}
                                    </td>
                                    <td className="text-center">
                                        {perkembangan.bayiId}
                                    </td>
                                    <td className="text-center">
                                        {perkembangan.nama}
                                    </td>
                                    <td className="text-center">
                                        {perkembangan.tanggalPemeriksaanBaru}
                                    </td>
                                    <td className="text-center">
                                        {perkembangan.beratBadan} {""} kg
                                    </td>
                                    <td className="text-center">
                                        {perkembangan.tinggiBadan} {""} cm
                                    </td>
                                    <td className="text-center">
                                        {perkembangan.lingkarKepala} {""} cm
                                    </td>
                                    <td className="text-center">
                                        {perkembangan.imunisasi}
                                    </td>
                                    <td className="text-center">
                                        {perkembangan.vitaminA}
                                    </td>

                                    <td>
                                        <button
                                            onClick={() =>
                                                handleClick(perkembangan.id)
                                            }
                                            className="button is-small is-danger"
                                            style={{ marginRight: "10px " }}
                                        >
                                            Hapus
                                        </button>
                                        <Link
                                            to={`/perkembangan/edit/${encodeURIComponent(
                                                perkembangan.id
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

export default PerkembanganBayiBalita;
