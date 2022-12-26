import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IbuModel from "../model/IbuModel";
import { useForm } from "react-hook-form";

const FormTambahDataIbu = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nik, setNik] = useState("");
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
        if (nik.length !== 11) {
            setMsg("NIK Harus terdiri dari 11 digit angka");
            setIsModalOpen(false);
        } else {
            simpanIbu();
            setIsModalOpen(false);
        }
    }

    function handleClick() {
        setIsModalOpen(true);
    }

    const simpanIbu = async () => {
        try {
            await IbuModel.simpanIbu({
                nik: nik,
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
                        <form onSubmit={simpanIbu} className="is-small">
                            <div className="field ">
                                <label className="label">Nik</label>
                                <div className="control">
                                    <input
                                        {...register("nik", {
                                            required: true,
                                            minLength: 11,
                                            maxLength: 11,
                                        })}
                                        type="number"
                                        className="input"
                                        placeholder="12345678901"
                                        value={nik}
                                        onChange={(e) => setNik(e.target.value)}
                                    />
                                    {errors.nik?.type === "required" && (
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
                                    {errors.nik?.type === "minLength" && (
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
                                            NIK harus berjumlah 11 digit
                                        </p>
                                    )}
                                    {errors.nik?.type === "maxLength" && (
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
                                            NIK harus berjumlah 11 digit
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">Nama</label>
                                <div className="control">
                                    <input
                                        {...register("nama", {
                                            required: true,
                                        })}
                                        type="text"
                                        className="input"
                                        placeholder="Nama"
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
                            <div className="field">
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
                            <div className="field ">
                                <label className="label">Alamat</label>
                                <div className="control">
                                    <input
                                        {...register("alamat", {
                                            required: true,
                                        })}
                                        type="text"
                                        className="input"
                                        placeholder="Alamat"
                                        value={alamat}
                                        onChange={(e) =>
                                            setAlamat(e.target.value)
                                        }
                                    />
                                    {errors.alamat?.type === "required" && (
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
                                <label className="label">RT</label>
                                <div className="control">
                                    <input
                                        {...register("rt", {
                                            required: true,
                                        })}
                                        type="number"
                                        className="input"
                                        placeholder="RT"
                                        value={rt}
                                        onChange={(e) => setRt(e.target.value)}
                                    />
                                    {errors.rt?.type === "required" && (
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
                                <label className="label">RW</label>
                                <div className="control">
                                    <input
                                        {...register("rw", {
                                            required: true,
                                        })}
                                        type="number"
                                        className="input"
                                        placeholder="RW"
                                        value={rw}
                                        onChange={(e) => setRw(e.target.value)}
                                    />
                                    {errors.rw?.type === "required" && (
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
                                <label className="label">Agama</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            {...register("agama", {
                                                required: true,
                                            })}
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
                                        {errors.agama?.type === "required" && (
                                            <p
                                                style={{
                                                    color: "red",
                                                    fontSize: "13px",
                                                    textAlign: "right",
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
                            <div className="field ">
                                <label className="label">Jumlah Anak</label>
                                <div className="control">
                                    <input
                                        {...register("jumlahAnak", {
                                            required: true,
                                        })}
                                        type="number"
                                        className="input"
                                        placeholder="jumlah anak"
                                        value={jumlahAnak}
                                        onChange={(e) =>
                                            setJumlahAnak(e.target.value)
                                        }
                                    />
                                    {errors.jumlahAnak?.type === "required" && (
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
                                <label className="label">No Hp</label>
                                <div className="control">
                                    <input
                                        {...register("noHp", {
                                            required: true,
                                        })}
                                        type="number"
                                        className="input"
                                        placeholder="081111111111"
                                        value={akunNoHp}
                                        onChange={(e) =>
                                            setakunNoHp(e.target.value)
                                        }
                                    />
                                    {errors.noHp?.type === "required" && (
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
                                        onClick={() => navigate("/ibu")}
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

export default FormTambahDataIbu;
