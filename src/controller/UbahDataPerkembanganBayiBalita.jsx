import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PerkembanganBayiBalitaModel from "../model/PerkembanganBayiBalitaModel";

const UbahDataPerkembanganBayiBalita = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const [bayiId, setBayiId] = useState("");
    const [nama, setNama] = useState("");
    const [tanggalPemeriksaan, setTanggalPemeriksaan] = useState("");
    const [beratBadan, setBeratBadan] = useState("");
    const [tinggiBadan, setTinggiBadan] = useState("");
    const [lingkarKepala, setLingkarKepala] = useState("");
    const [imunisasi, setImunisasi] = useState("");
    const [vitaminA, setVitaminA] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    function handleConfirm() {
        updatePerkembanganBayiBalita();
        setIsModalOpen(false);
    }

    function handleClick(e) {
        e.preventDefault();
        setIsModalOpen(true);
    }

    useEffect(() => {
        tampilPerkembanganBayiBalita();
    }, [id]);

    const tampilPerkembanganBayiBalita = async () => {
        try {
            const data = await PerkembanganBayiBalitaModel.muatPerkembanganId(
                id
            );
            setBayiId(data.bayiId);
            setNama(data.nama);
            setTanggalPemeriksaan(data.tanggalPemeriksaan);
            setBeratBadan(data.beratBadan);
            setTinggiBadan(data.tinggiBadan);
            setLingkarKepala(data.lingkarKepala);
            setImunisasi(data.imunisasi);
            setVitaminA(data.vitaminA);
        } catch (error) {
            setMsg(error.data.msg);
        }
    };

    const updatePerkembanganBayiBalita = async () => {
        try {
            await PerkembanganBayiBalitaModel.updatePerkembanganBayiBalita(id, {
                bayiId: bayiId,
                nama: nama,
                tanggalPemeriksaan: tanggalPemeriksaan,
                beratBadan: beratBadan,
                tinggiBadan: tinggiBadan,
                lingkarKepala: lingkarKepala,
                imunisasi: imunisasi,
                vitaminA: vitaminA,
            }).then((response) => setMsg(response.data.msg));
            setTimeout(() => {
                navigate("/perkembangan");
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
                PERKEMBANGAN BAYI/BALITA
            </h1>
            <div className="card id-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form
                            onSubmit={updatePerkembanganBayiBalita}
                            className="is-small"
                        >
                            <div className="field ">
                                <label className="label">ID Bayi</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder="ID Bayi"
                                        value={bayiId}
                                        onChange={(e) =>
                                            setBayiId(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Nama Bayi</label>
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
                            <div className="field">
                                <label className="label">
                                    Tanggal Pemeriksaan
                                </label>
                                <div className="control">
                                    <input
                                        type="date"
                                        className="input"
                                        placeholder="Tanggal Pemeriksaan"
                                        value={tanggalPemeriksaan}
                                        onChange={(e) =>
                                            setTanggalPemeriksaan(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">Berat Badan</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        step="01.01"
                                        pattern="^\d+(?:\.\d{1,2})?$"
                                        className="input"
                                        placeholder="Berat badan"
                                        value={beratBadan}
                                        onChange={(e) =>
                                            setBeratBadan(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">Tinggi Badan</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        step="01.01"
                                        pattern="^\d+(?:\.\d{1,2})?$"
                                        className="input"
                                        placeholder="Tinggi Badan"
                                        value={tinggiBadan}
                                        onChange={(e) =>
                                            setTinggiBadan(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">Lingkar Kepala</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        step="01.01"
                                        pattern="^\d+(?:\.\d{1,2})?$"
                                        className="input"
                                        placeholder="Lingkar Kepala"
                                        value={lingkarKepala}
                                        onChange={(e) =>
                                            setLingkarKepala(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Imunisasi</label>
                                <div className="control">
                                    <div className="select is-half">
                                        <select
                                            value={imunisasi}
                                            onChange={(e) =>
                                                setImunisasi(e.target.value)
                                            }
                                        >
                                            <option value="">Imunisasi</option>
                                            <option value="Hepatitis B">
                                                Hepatitis B
                                            </option>
                                            <option value="BCG">BCG</option>
                                            <option value="Polio">Polio</option>
                                            <option value="DPT">DPT</option>
                                            <option value="Campak">
                                                Campak
                                            </option>
                                            <option value="Tidak Ada">
                                                Tidak Ada
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Vitamin A</label>
                                <div className="control">
                                    <div className="select is-half">
                                        <select
                                            value={vitaminA}
                                            onChange={(e) =>
                                                setVitaminA(e.target.value)
                                            }
                                        >
                                            <option value="">Vitamin A</option>
                                            <option value="Sudah B">
                                                Sudah
                                            </option>
                                            <option value="Belum">Belum</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control ">
                                    <button
                                        onClick={() =>
                                            navigate("/perkembangan")
                                        }
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

export default UbahDataPerkembanganBayiBalita;
