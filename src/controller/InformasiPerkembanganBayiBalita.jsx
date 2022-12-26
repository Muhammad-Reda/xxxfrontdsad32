import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "../components/DaftarAkun.css";
import { isMobile } from "react-device-detect";
import ReactPaginate from "react-paginate";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import PerkembanganBayiBalitaModel from "../model/PerkembanganBayiBalitaModel";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    indexAxis: "x",
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
        },
    },
};

const InformasiPerkembanganBayiBalita = () => {
    const [isChart, setIsChart] = useState(false);
    const [idBayi, setIdBayi] = useState("");
    const [dataInformasi, setdataInformasi] = useState([]);
    const [imunisasi, setImunisasi] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keywordNama, setKeywordNama] = useState("");
    const [keywordTahun, setKeywordTahun] = useState("");
    const [queryNama, setQueryNama] = useState("");
    const [queryTahun, setQueryTahun] = useState("");
    const [data, setData] = useState({
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "Dataset 1",
                data: [],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(25, 90, 13, 0.5)",
            },
        ],
    });

    useEffect(() => {
        tampilDataBayi();
        tampilDataChart();
        tampilDataImunisasi();
    }, [keywordNama, keywordTahun, idBayi, page]);

    const tampilDataBayi = async () => {
        const data = await PerkembanganBayiBalitaModel.muatDataBayi(
            keywordNama,
            page,
            limit
        );
        setdataInformasi(data.response);
        setPage(data.page);
        setPages(data.totalPage);
        setRows(data.totalRows);
    };

    const bukaChart = (id) => {
        imunisasi.length = 0;
        setIsChart(true);
        setIdBayi(id);
    };

    const tampilDataImunisasi = async () => {
        const response = await PerkembanganBayiBalitaModel.muatDataImunisasi(
            idBayi
        );
        for (const data of response) {
            imunisasi.push(data.imunisasi);
        }
    };

    const tampilDataChart = async () => {
        const data = await PerkembanganBayiBalitaModel.muatDataChart(
            keywordTahun,
            idBayi
        );
        const labelSet = [];
        const dataSet = [];
        const dataSet2 = [];
        const dataSet3 = [];

        for (const datas of data.response) {
            labelSet.push(datas.bulanPemeriksaan);
            dataSet.push(datas.tinggiBadan);
            dataSet2.push(datas.lingkarKepala);
            dataSet3.push(datas.beratBadan);
        }
        setData({
            labels: labelSet,
            datasets: [
                {
                    label: "Tinggi Badan",
                    data: dataSet,
                    borderColor: "white",
                    backgroundColor: "rgba(63, 143, 229)",
                },
                {
                    label: "Lingkar Kepala",
                    data: dataSet2,
                    borderColor: "white",
                    backgroundColor: "rgba(231, 177, 41)",
                },
                {
                    label: "Berat Badan",
                    data: dataSet3,
                    borderColor: "white",
                    backgroundColor: "rgba(41, 231, 171)",
                },
            ],
        });
    };

    const searchDataTahun = (e) => {
        e.preventDefault();
        setKeywordTahun(queryTahun);
    };

    const searchDataNama = (e) => {
        e.preventDefault();
        setKeywordNama(queryNama);
    };

    const changePage = ({ selected }) => {
        setPage(selected);
    };

    const aturLimit = (e) => {
        e.preventDefault();
        setLimit(limit);
    };

    return (
        <>
            <div>
                <h1
                    className="title "
                    style={{ textAlign: "center", marginTop: " 20px" }}
                >
                    INFORMASI PERKEMBANGAN BAYI BALITA
                </h1>

                {isChart && (
                    <div>
                        <form
                            onSubmit={searchDataTahun}
                            style={{
                                padding: "10px",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <div className="field has-addons">
                                <div className="control ml-5">
                                    <input
                                        className="input"
                                        type="number"
                                        value={queryTahun}
                                        onChange={(e) =>
                                            setQueryTahun(e.target.value)
                                        }
                                        placeholder="Filter Tahun"
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
                            <button
                                className="button is-times"
                                style={{ marginRight: "10px" }}
                                onClick={() => setIsChart(false)}
                            >
                                Tutup
                            </button>
                        </form>
                        <div
                            className="chart-container"
                            style={{ marginLeft: "30px" }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <div style={{ width: "70%", height: "50%" }}>
                                    <Bar data={data} options={options} />
                                </div>
                            </div>
                        </div>
                        {isChart && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "30px",
                                }}
                            >
                                <Table
                                    className={
                                        isMobile
                                            ? "table-responsive is-bordered text-center"
                                            : "table is-bordered text-center"
                                    }
                                    style={{
                                        width: "50%",
                                    }}
                                >
                                    <thead className="thead-light">
                                        <tr>
                                            <th className=" text-center">
                                                Imunisasi
                                            </th>
                                            <th className=" text-center">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td className="isi">BCG</td>
                                            <td className="isi">
                                                {imunisasi.includes("BCG")
                                                    ? "Sudah"
                                                    : "Belum"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="isi">Polio</td>
                                            <td className="isi">
                                                {imunisasi.includes("Polio")
                                                    ? "Sudah"
                                                    : "Belum"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="isi">Hepatitis B</td>
                                            <td className="isi">
                                                {imunisasi.includes(
                                                    "Hepatitis B"
                                                )
                                                    ? "Sudah"
                                                    : "Belum"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="isi">Campak</td>
                                            <td className="isi">
                                                {imunisasi.includes("Campak")
                                                    ? "Sudah"
                                                    : "Belum"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="isi">DPT</td>
                                            <td className="isi">
                                                {imunisasi.includes("DPT")
                                                    ? "Sudah"
                                                    : "Belum"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </div>
                )}

                <div className="container mt-6">
                    <form
                        onSubmit={searchDataNama}
                        style={{
                            padding: "10px",
                        }}
                    >
                        <div className="field has-addons">
                            <div
                                className="control ml-5"
                                style={{
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                }}
                            >
                                <input
                                    className="input"
                                    type="text"
                                    value={queryNama}
                                    onChange={(e) =>
                                        setQueryNama(e.target.value)
                                    }
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
                                    <th className=" text-center">ID Bayi</th>
                                    <th className=" text-center">Nama Bayi</th>
                                    <th className=" text-center">Nama Ibu</th>
                                    <th className=" text-center">
                                        Tanggal Lahir
                                    </th>
                                    <th className=" text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataInformasi.map((data, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="isi">{data.id}</td>
                                        <td className="isi">{data.nama}</td>
                                        <td className="isi">{data.ibu.nama}</td>
                                        <td className="isi">
                                            {data.tanggalLahir}
                                        </td>
                                        <td className="isi">
                                            <button
                                                onClick={() =>
                                                    bukaChart(data.id)
                                                }
                                                className="button is-small is-info"
                                                style={{ padding: "10px " }}
                                            >
                                                Lihat
                                            </button>
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

export default InformasiPerkembanganBayiBalita;
