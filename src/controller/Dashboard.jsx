import React, { useState, useEffect } from "react";
import InformasiPosyandu from "../model/InformasiPosyanduModel";
import { Typewriter } from "react-simple-typewriter";
import { useSelector } from "react-redux";

const DashboardController = () => {
    const [informasi, setInformasi] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        tampilSemuaInformasiPosyadu();
    }, []);

    const tampilSemuaInformasiPosyadu = async () => {
        const data = await InformasiPosyandu.muatSemuaInformasiPosyandu();
        setInformasi(data);
    };

    return (
        <>
            <p
                style={{
                    marginLeft: "40px",
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            >
                <span style={{ color: "black", fontWeight: "bold" }}>
                    {/* Style will be inherited from the parent element */}
                    <Typewriter
                        words={[
                            `Selamat Datang ${
                                user && user.username
                            } di Posyandu Benih Gemilang`,
                        ]}
                        loop={5}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={30}
                        delaySpeed={1000}
                    />
                </span>
            </p>

            {informasi.map((data, index) => {
                return (
                    <div style={{ marginTop: "20px" }} key={index}>
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

export default DashboardController;
