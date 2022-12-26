import React, { useState, useEffect } from "react";
import InformasiPosyanduModel from "../model/InformasiPosyanduModel";
import { Link } from "react-router-dom";

const InformasiPosyandu = () => {
    const [informasi, setInformasi] = useState([]);

    useEffect(() => {
        tampilSemuaInformasiPosyandu();
    }, []);

    const tampilSemuaInformasiPosyandu = async () => {
        const data = await InformasiPosyanduModel.muatSemuaInformasiPosyandu();
        setInformasi(data);
    };

    return (
        <>
            {informasi.map((data) => {
                return (
                    <div style={{ marginTop: "20px" }} key={data.id}>
                        <div
                            className="card "
                            style={{
                                width: "90%",
                                marginLeft: "40px",
                                marginRight: "40px",
                            }}
                        >
                            <div className="card-content">
                                <div
                                    className="content"
                                    style={{ marginTop: "20px" }}
                                >
                                    <Link
                                        to={`/berita/edit/${encodeURIComponent(
                                            data.id
                                        )}`}
                                        className="button is-small is-info is-pulled-right"
                                    >
                                        Ubah
                                    </Link>
                                    <p>
                                        Jadwal :{data.tanggalMulaiBaru} -{" "}
                                        {data.tanggalSelesaiBaru}
                                    </p>
                                    <p>{data.berita}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default InformasiPosyandu;
