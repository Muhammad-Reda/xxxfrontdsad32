import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KaderBidanModel from "../model/KaderBidanModel";

const FormEditDataKaderBidan = () => {
    const { nik } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nama, setNama] = useState("");
    const [tempatLahir, setTempatLahir] = useState("");
    const [tanggalLahir, setTanggalLahir] = useState("");
    const [alamat, setAlamat] = useState("");
    const [agama, setAgama] = useState("");
    const [status, setstatus] = useState("");
    const [jabatan, setjabatan] = useState("");
    const [periodeKerjaMulai, setperiodeKerjaMulai] = useState("");
    const [periodeKerjaBerakhir, setperiodeKerjaBerakhir] = useState("");
    const [akunNoHp, setakunNoHp] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        tampilKaderBidan();
    }, [nik]);

    const tampilKaderBidan = async () => {
        try {
            const data = await KaderBidanModel.muatKaderBidanNik(nik);
            setNama(data.nama);
            setTempatLahir(data.tempatLahir);
            setTanggalLahir(data.tanggalLahir);
            setAlamat(data.alamat);
            setAgama(data.agama);
            setstatus(data.status);
            setjabatan(data.jabatan);
            setperiodeKerjaMulai(data.periodeKerjaMulai);
            setperiodeKerjaBerakhir(data.periodeKerjaBerakhir);
            setakunNoHp(data.akunNoHp);
        } catch (error) {
            setMsg(error.data.msg);
        }
    };

    const updateKaderBidan = async () => {
        try {
            await KaderBidanModel.updateKaderBidan(nik, {
                nama: nama,
                tempatLahir: tempatLahir,
                tanggalLahir: tanggalLahir,
                alamat: alamat,
                agama: agama,
                status: status,
                jabatan: jabatan,
                periodeKerjaMulai: periodeKerjaMulai,
                periodeKerjaBerakhir: periodeKerjaBerakhir,
                akunNoHp: akunNoHp,
            }).then((response) => setMsg(response.data.msg));
            setTimeout(() => {
                navigate("/petugas");
            }, 2500);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    function handleConfirm() {
        updateKaderBidan();
        setIsModalOpen(false);
    }

    function handleClick(e) {
        e.preventDefault();
        setIsModalOpen(true);
    }

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
            <h1 className="title text-center">Petugas</h1>
            <div className="card id-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateKaderBidan}>
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

                            <div className="field">
                                <label className="label">Status</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            value={status}
                                            onChange={(e) =>
                                                setstatus(e.target.value)
                                            }
                                        >
                                            <option value="">Status</option>
                                            <option value="Aktif">Aktif</option>
                                            <option value="Tidak AKtif">
                                                Tidak Aktif
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Jabatan</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            value={jabatan}
                                            onChange={(e) =>
                                                setjabatan(e.target.value)
                                            }
                                        >
                                            <option value="">Jabatan</option>
                                            <option value="ketua">Kader</option>
                                            <option value="kader">Bidan</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">
                                    Periode Kerja Mulai
                                </label>
                                <div className="control">
                                    <input
                                        type="date"
                                        className="input"
                                        placeholder="2022-10-17"
                                        value={periodeKerjaMulai}
                                        onChange={(e) =>
                                            setperiodeKerjaMulai(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">
                                    Periode Kerja Berakhir
                                </label>
                                <div className="control">
                                    <input
                                        type="date"
                                        className="input"
                                        placeholder="2023-10-17"
                                        value={periodeKerjaBerakhir}
                                        onChange={(e) =>
                                            setperiodeKerjaBerakhir(
                                                e.target.value
                                            )
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
                                        onClick={() => navigate("/petugas")}
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

export default FormEditDataKaderBidan;
