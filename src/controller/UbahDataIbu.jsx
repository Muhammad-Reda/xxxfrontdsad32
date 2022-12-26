import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IbuModel from "../model/IbuModel";

const FormEditDataIbu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { nik } = useParams();
    const [nama, setNama] = useState("");
    const [tempatLahir, setTempatLahir] = useState("");
    const [tanggalLahir, setTanggalLahir] = useState("");
    const [alamat, setAlamat] = useState("");
    const [rt, setRt] = useState("");
    const [rw, setRw] = useState("");
    const [agama, setAgama] = useState("");
    const [jumlahAnak, setJumlahAnak] = useState("");
    const [akunNoHp, setakunNoHp] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    function handleConfirm() {
        updateIbu();
        setIsModalOpen(false);
    }

    function handleClick(e) {
        e.preventDefault();
        // Tampilkan pop up konfirmasi sebelum mengeksekusi function
        setIsModalOpen(true);
    }

    useEffect(() => {
        tampilIbu();
    }, [nik]);

    const tampilIbu = async () => {
        try {
            const data = await IbuModel.muatIbuNik(nik);
            setNama(data.nama);
            setTempatLahir(data.tempatLahir);
            setTanggalLahir(data.tanggalLahir);
            setAlamat(data.alamat);
            setRt(data.rt);
            setRw(data.rw);
            setAgama(data.agama);
            setJumlahAnak(data.jumlahAnak);
            setakunNoHp(data.akunNoHp);
        } catch (error) {
            setMsg(error.data.msg);
        }
    };

    const updateIbu = async () => {
        try {
            await IbuModel.updateIbu(nik, {
                nama: nama,
                tempatLahir: tempatLahir,
                tanggalLahir: tanggalLahir,
                alamat: alamat,
                rt: rt,
                rw: rw,
                agama: agama,
                jumlahAnak: jumlahAnak,
                akunNoHp: akunNoHp,
            }).then((response) => setMsg(response.data.msg));
            setTimeout(() => {
                navigate("/ibu");
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
                Ibu
            </h1>
            <div className="card id-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateIbu} className="is-small">
                            <div className="field ">
                                <label className="label">Nama</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Nama"
                                        value={nama}
                                        onChange={(e) =>
                                            setNama(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
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
                            <div className="field">
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
                            <div className="field ">
                                <label className="label">Alamat</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Alamat"
                                        value={alamat}
                                        onChange={(e) =>
                                            setAlamat(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">RT</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder="agama"
                                        value={rt}
                                        onChange={(e) => setRt(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">RW</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder="Status"
                                        value={rw}
                                        onChange={(e) => setRw(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Agama</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            value={agama}
                                            onChange={(e) =>
                                                setAgama(e.target.value)
                                            }
                                        >
                                            <option value="">Agama</option>
                                            <option value="Islam">Islam</option>
                                            <option value="Kristen">
                                                Kristen
                                            </option>
                                            <option value="Katolik">
                                                Katolik
                                            </option>
                                            <option value="Hindu">Hindu</option>
                                            <option value="Buddha">
                                                Buddha
                                            </option>
                                            <option value="Konghucu">
                                                Konghucu
                                            </option>
                                            <option value="Kepercayaan terhadap Tuhan yang maha Esa">
                                                Kepercayaan terhadap Tuhan yang
                                                maha Esa
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">Jumlah Anak</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder="jumlah anak"
                                        value={jumlahAnak}
                                        onChange={(e) =>
                                            setJumlahAnak(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">No Hp</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder="081111111111"
                                        value={akunNoHp}
                                        onChange={(e) =>
                                            setakunNoHp(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control ">
                                    <button
                                        onClick={() => navigate("/ibu")}
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

export default FormEditDataIbu;
