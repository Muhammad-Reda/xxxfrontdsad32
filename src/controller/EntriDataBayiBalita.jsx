import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BayiBalitaModel from "../model/BayiBalitaModel";
import { useForm } from "react-hook-form";

const EntriDataBayiBalita = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState("");
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
        simpanBayiBalita();
        setIsModalOpen(false);
    }

    function handleClick() {
        setIsModalOpen(true);
    }

    const simpanBayiBalita = async () => {
        try {
            await BayiBalitaModel.simpanBayiBalita({
                id: id,
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
            <h1 className="title text-center" tyle={{ padding: "10px" }}>
                Bayi
            </h1>
            <div className="card id-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={simpanBayiBalita} className="is-small">
                            <div className="field ">
                                <label className="label">ID</label>
                                <div className="control">
                                    <input
                                        {...register("id", {
                                            required: true,
                                            minLength: 13,
                                            maxLength: 13,
                                        })}
                                        type="number"
                                        className="input"
                                        placeholder="ID"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                    {errors.id?.type === "required" && (
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
                                            Tidak boleh Kosong
                                        </p>
                                    )}
                                    {errors.id?.type === "minLength" && (
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
                                            ID harus berjumlah 13 digit
                                        </p>
                                    )}
                                    {errors.id?.type === "maxLength" && (
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
                                            ID harus berjumlah 13 digit
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">NIK Ibu</label>
                                <div className="control">
                                    <input
                                        {...register("nikIbu", {
                                            required: true,
                                        })}
                                        type="number"
                                        className="input"
                                        placeholder="NIK Ibu"
                                        value={ibuNik}
                                        onChange={(e) =>
                                            setIbuNik(e.target.value)
                                        }
                                    />
                                    {errors.nikIbu?.type === "required" && (
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
                                            Tidak boleh Kosong
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Nama</label>
                                <div className="control">
                                    <input
                                        {...register("nama", {
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
                                    {errors.nama?.type === "required" && (
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
                                            Tidak boleh Kosong
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">Tempat Lahir</label>
                                <div className="control">
                                    <input
                                        {...register("tempatLahir", {
                                            required: true,
                                        })}
                                        type="text"
                                        className="input"
                                        placeholder="Tempat Lahir"
                                        value={tempatLahir}
                                        onChange={(e) =>
                                            setTempatLahir(e.target.value)
                                        }
                                    />
                                    {errors.tempatLahir?.type ===
                                        "required" && (
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
                                            Tidak boleh Kosong
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Tanggal Lahir</label>
                                <div className="control">
                                    <input
                                        {...register("tanggalLahir", {
                                            required: true,
                                        })}
                                        type="date"
                                        className="input"
                                        placeholder="Tanggal Lahir"
                                        value={tanggalLahir}
                                        onChange={(e) =>
                                            setTanggalLahir(e.target.value)
                                        }
                                    />
                                    {errors.tanggalLahir?.type ===
                                        "required" && (
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
                                            Tidak boleh Kosong
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Jenis Kelamin</label>
                                <div className="control">
                                    <div className="select is-half">
                                        <select
                                            {...register("jenisKelamin", {
                                                required: true,
                                            })}
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
                                        {errors.jenisKelamin?.type ===
                                            "required" && (
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
                                                Tidak boleh Kosong
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Berat Lahir</label>
                                <div className="control">
                                    <input
                                        {...register("beratLahir", {
                                            required: true,
                                        })}
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
                                    {errors.beratLahir?.type === "required" && (
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
                                            Tidak boleh Kosong
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">Panjang Lahir</label>
                                <div className="control">
                                    <input
                                        {...register("panjangLahir", {
                                            required: true,
                                        })}
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
                                    {errors.panjangLahir?.type ===
                                        "required" && (
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
                                            Tidak boleh Kosong
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Kondisi Persalinan
                                </label>
                                <div className="control">
                                    <input
                                        {...register("kondisiPersalinan", {
                                            required: true,
                                        })}
                                        type="text"
                                        className="input"
                                        placeholder="Kondisi Persalinan"
                                        value={kondisiPersalinan}
                                        onChange={(e) =>
                                            setKondisiPersalinan(e.target.value)
                                        }
                                    />
                                    {errors.kondisiPersalinan?.type ===
                                        "required" && (
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
                                            Tidak boleh Kosong
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Anak ke</label>
                                <div className="control">
                                    <input
                                        {...register("anakKe", {
                                            required: true,
                                        })}
                                        type="text"
                                        className="input"
                                        placeholder="Anak Ke-"
                                        value={anakKe}
                                        onChange={(e) =>
                                            setAnakKe(e.target.value)
                                        }
                                    />
                                    {errors.anakKe?.type === "required" && (
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
                                            Tidak boleh Kosong
                                        </p>
                                    )}
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

export default EntriDataBayiBalita;
