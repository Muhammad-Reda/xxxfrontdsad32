import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PerkembanganBayiBalitaModel from "../model/PerkembanganBayiBalitaModel";

const EntriDataPerkembanganBayiBalita = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        simpanPerkembanganBayiBalita();
        setIsModalOpen(false);
    }

    function handleClick() {
        setIsModalOpen(true);
    }

    const simpanPerkembanganBayiBalita = async () => {
        try {
            await PerkembanganBayiBalitaModel.simpanPerkembanganBayiBalita({
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
                PERKEMBANGAN BAYI BALITA
            </h1>
            <div className="card id-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form
                            onSubmit={simpanPerkembanganBayiBalita}
                            className="is-small"
                        >
                            <div className="field ">
                                <label className="label">ID Bayi</label>
                                <div className="control">
                                    <input
                                        {...register("idBayi", {
                                            required: true,
                                        })}
                                        type="number"
                                        className="input"
                                        placeholder="ID Bayi"
                                        value={bayiId}
                                        onChange={(e) =>
                                            setBayiId(e.target.value)
                                        }
                                    />
                                    {errors.idBayi?.type === "required" && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "13px",
                                            }}
                                        >
                                            <i
                                                class="fa fa-exclamation-triangle"
                                                aria-hidden="true"
                                            />
                                            Tidak boleh kosong
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Nama Bayi</label>
                                <div className="control">
                                    <input
                                        {...register("namaBayi", {
                                            required: true,
                                        })}
                                        type="text"
                                        className="input"
                                        placeholder="Nama Bayi"
                                        value={nama}
                                        onChange={(e) =>
                                            setNama(e.target.value)
                                        }
                                    />
                                    {errors.namaBayi?.type === "required" && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "13px",
                                            }}
                                        >
                                            <i
                                                className="fa fa-exclamation-triangle"
                                                aria-hidden="true"
                                            />
                                            Tidak boleh kosong
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Tanggal Pemeriksaan
                                </label>
                                <div className="control">
                                    <input
                                        {...register("tanggalPemeriksaan", {
                                            required: true,
                                        })}
                                        type="date"
                                        className="input"
                                        value={tanggalPemeriksaan}
                                        onChange={(e) =>
                                            setTanggalPemeriksaan(
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.tanggalPemeriksaan?.type ===
                                        "required" && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "13px",
                                            }}
                                        >
                                            <i
                                                className="fa fa-exclamation-triangle"
                                                aria-hidden="true"
                                            />
                                            Tidak boleh kosong
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">Berat Badan</label>
                                <div className="control">
                                    <input
                                        {...register("beratBadan", {
                                            required: true,
                                        })}
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
                                    {errors.beratBadan?.type === "required" && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "13px",
                                            }}
                                        >
                                            <i
                                                className="fa fa-exclamation-triangle"
                                                aria-hidden="true"
                                            />
                                            Tidak boleh kosong
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">Tinggi Badan</label>
                                <div className="control">
                                    <input
                                        {...register("tinggiBadan", {
                                            required: true,
                                        })}
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
                                    {errors.tinggiBadan?.type ===
                                        "required" && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "13px",
                                            }}
                                        >
                                            <i
                                                className="fa fa-exclamation-triangle"
                                                aria-hidden="true"
                                            />
                                            Tidak boleh kosong
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">Lingkar Kepala</label>
                                <div className="control">
                                    <input
                                        {...register("lingkarKepala", {
                                            required: true,
                                        })}
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
                                    {errors.lingkarKepala?.type ===
                                        "required" && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "13px",
                                            }}
                                        >
                                            <i
                                                className="fa fa-exclamation-triangle"
                                                aria-hidden="true"
                                            />
                                            Tidak boleh kosong
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Imunisasi</label>
                                <div className="control">
                                    <div className="select is-half">
                                        <select
                                            {...register("imunisasi", {
                                                required: true,
                                            })}
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
                                        {errors.imunisasi?.type ===
                                            "required" && (
                                            <p
                                                style={{
                                                    color: "red",
                                                    fontSize: "13px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <i
                                                    className="fa fa-exclamation-triangle"
                                                    aria-hidden="true"
                                                />
                                                Tidak boleh kosong
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Vitamin A</label>
                                <div className="control">
                                    <div className="select is-half">
                                        <select
                                            {...register("vitaminA", {
                                                required: true,
                                            })}
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
                                        onClick={handleSubmit(handleClick)}
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

export default EntriDataPerkembanganBayiBalita;
