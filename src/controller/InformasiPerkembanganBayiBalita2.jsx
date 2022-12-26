import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "../components/DaftarAkun.css";
import { isMobile } from "react-device-detect";
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
import { useParams } from "react-router-dom";
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

const InformasiPerkembanganBayiBalita2 = () => {
    const { noHp } = useParams();
    const [namaIbu, setNamaIbu] = useState("");
    const [isChart, setIsChart] = useState(false);
    const [idBayi, setIdBayi] = useState("");
    const [dataInformasi, setdataInformasi] = useState([]);
    const [imunisasi, setImunisasi] = useState([]);
    const [keywordTahun, setKeywordTahun] = useState("");
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
        tampilDataBayiBalitaIbu();
        tampilDataChart();
        tampilDataImunisasi();
    }, [, keywordTahun, idBayi]);

    const bukaChart = (id) => {
        imunisasi.length = 0;
        setIsChart(true);
        setIdBayi(id);
    };

    const tampilDataBayiBalitaIbu = async () => {
        const data = await PerkembanganBayiBalitaModel.muatDataBayiOlehIbu(
            noHp
        );
        setNamaIbu(data.ibu.nama);
        setdataInformasi(data.ibu.bayis);
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
        const response = await PerkembanganBayiBalitaModel.muatDataChart(
            keywordTahun,
            idBayi
        );
        const labelSet = [];
        const dataSet = [];
        const dataSet2 = [];
        const dataSet3 = [];

        for (const data of response.response) {
            labelSet.push(data.bulanPemeriksaan);
            dataSet.push(data.tinggiBadan);
            dataSet2.push(data.lingkarKepala);
            dataSet3.push(data.beratBadan);
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
                    <div className="table-data-bayi">
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
                                        <td className="isi">{namaIbu}</td>
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default InformasiPerkembanganBayiBalita2;
