import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InformasiPosyanduModel from "../model/InformasiPosyanduModel";

const UbahInformasiPosyandu = () => {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [tanggalMulai, setTanggalMulai] = useState("");
    const [tanggalSelesai, setTanggalSelesai] = useState("");
    const [berita, setBerita] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        tampilInformasiPosyandu();
    }, []);

    const tampilInformasiPosyandu = async () => {
        try {
            const data = await InformasiPosyanduModel.muatInformasiPosyanduId(
                id
            );
            setTanggalMulai(data.tanggalMulaiBaru);
            setTanggalSelesai(data.tanggalselesaiBaru);
            setBerita(data.berita);
        } catch (error) {
            setMsg(error.data.msg);
        }
    };

    const updateInformasiPosyandu = async () => {
        try {
            await InformasiPosyanduModel.updateInformasiPosyandu(id, {
                tanggalMulai: tanggalMulai,
                tanggalSelesai: tanggalSelesai,
                berita: berita,
            }).then((response) => setMsg(response.data.msg));
            setTimeout(() => {
                navigate("/berita");
            }, 2500);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    function handleClick(e) {
        e.preventDefault();
        // Tampilkan pop up konfirmasi sebelum mengeksekusi function
        setIsModalOpen(true);
    }

    function handleConfirm() {
        updateInformasiPosyandu();
        setIsModalOpen(false);
    }

    return (
        <>
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
                                onClick={() => setMsg("")}
                            >
                                OK
                            </button>
                        </footer>
                    </div>
                </div>
            )}
            <h1
                className="title "
                style={{ textAlign: "center", padding: "15px" }}
            >
                UBAH INFORMASI POSYANDU
            </h1>
            <div className="card id-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form
                            onSubmit={updateInformasiPosyandu}
                            className="is-fullwidth"
                        >
                            <div className="field ">
                                <label className="label">Tanggal Mulai</label>
                                <div className="control">
                                    <input
                                        type="datetime-local"
                                        className="input"
                                        placeholder="Tanggal Mulai"
                                        value={tanggalMulai}
                                        onChange={(e) =>
                                            setTanggalMulai(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Tanggal Selesai</label>
                                <div className="control">
                                    <input
                                        type="datetime-local"
                                        className="input"
                                        placeholder="Tanggal selesai"
                                        value={tanggalSelesai}
                                        onChange={(e) =>
                                            setTanggalSelesai(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Berita</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Berita"
                                        value={berita}
                                        onChange={(e) =>
                                            setBerita(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="control ">
                                <button
                                    onClick={() => navigate("/berita")}
                                    className="button is-danger is-right mr-3"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="button is-success "
                                    onClick={handleClick}
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UbahInformasiPosyandu;
