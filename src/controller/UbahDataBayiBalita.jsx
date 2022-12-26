import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BayiBalitaModel from "../model/BayiBalitaModel";

const UbahDataBayiBalita = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const [ibuNik, setIbuNik] = useState("");
    const [nama, setNama] = useState("");
    const [tempatLahir, setTempatLahir] = useState("");
    const [tanggalLahir, setTanggalLahir] = useState("");
    const [jenisKelamin, setJenisKelamin] = useState("");
    const [beratLahir, setBeratLahir] = useState("");
    const [PanjangLahir, setPanjangLahir] = useState("");
    const [kondisiPersalinan, setKondisiPersalinan] = useState("");
    const [anakKe, setAnakKe] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    function handleConfirm() {
        updateBayiBalita();
        setIsModalOpen(false);
    }

    function handleClick(e) {
        e.preventDefault();
        // Tampilkan pop up konfirmasi sebelum mengeksekusi function
        setIsModalOpen(true);
    }

    useEffect(() => {
        tampilBayiBalita();
    }, [id]);

    const tampilBayiBalita = async () => {
        try {
            const data = await BayiBalitaModel.muatBayiBalitaId(id);
            setIbuNik(data.ibuNik);
            setNama(data.nama);
            setTempatLahir(data.tempatLahir);
            setTanggalLahir(data.tanggalLahir);
            setJenisKelamin(data.jenisKelamin);
            setBeratLahir(data.beratLahir);
            setPanjangLahir(data.panjangLahir);
            setKondisiPersalinan(data.kondisiPersalinan);
            setAnakKe(data.anakKe);
        } catch (error) {
            setMsg(error.data.msg);
        }
    };

    const updateBayiBalita = async () => {
        try {
            await BayiBalitaModel.updataBayiBalita(id, {
                ibuNik: ibuNik,
                nama: nama,
                tempatLahir: tempatLahir,
                tanggalLahir: tanggalLahir,
                jenisKelamin: jenisKelamin,
                beratLahir: beratLahir,
                panjangLahir: PanjangLahir,
                kondisiPersalinan: kondisiPersalinan,
                anakKe: anakKe,
            }).then((response) => setMsg(response.data.msg));
            setTimeout(() => {
                navigate("/bayi");
            }, 2500);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
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
                                onClick={() => setMsg("")}
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
            <h1 className="title text-center" style={{ padding: "10px" }}>
                BAYI
            </h1>
            <div className="card id-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateBayiBalita} className="is-small">
                            <div className="field">
                                <label className="label">NIK Ibu</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder="NIK Ibu"
                                        value={ibuNik}
                                        onChange={(e) =>
                                            setIbuNik(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Nama</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Nama Bayi"
                                        value={nama}
                                        onChange={(e) =>
                                            setNama(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">Tempat Lahir</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Tempat Lahir"
                                        value={tempatLahir}
                                        onChange={(e) =>
                                            setTempatLahir(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">Tanggal Lahir</label>
                                <div className="control">
                                    <input
                                        type="date"
                                        className="input"
                                        placeholder="Tanggal Lahir"
                                        value={tanggalLahir}
                                        onChange={(e) =>
                                            setTanggalLahir(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Jenis Kelamin</label>
                                <div className="control">
                                    <div className="select is-half">
                                        <select
                                            value={jenisKelamin}
                                            onChange={(e) =>
                                                setJenisKelamin(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Jenis Kelamin
                                            </option>
                                            <option value="Laki-Laki">
                                                Laki-Laki
                                            </option>
                                            <option value="Perempuan">
                                                Perempuan
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Berat Lahir</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        step="01.01"
                                        pattern="^\d+(?:\.\d{1,2})?$"
                                        className="input"
                                        placeholder="Berat Lahir"
                                        value={beratLahir}
                                        onChange={(e) =>
                                            setBeratLahir(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">Panjang Lahir</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        step="01.01"
                                        pattern="^\d+(?:\.\d{1,2})?$"
                                        className="input"
                                        placeholder="Panjang Lahir"
                                        value={PanjangLahir}
                                        onChange={(e) =>
                                            setPanjangLahir(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Kondisi Persalinan
                                </label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Kondisi Persalinan"
                                        value={kondisiPersalinan}
                                        onChange={(e) =>
                                            setKondisiPersalinan(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Anak ke</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Anak Ke-"
                                        value={anakKe}
                                        onChange={(e) =>
                                            setAnakKe(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control ">
                                    <button
                                        onClick={() => navigate("/bayi")}
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UbahDataBayiBalita;
