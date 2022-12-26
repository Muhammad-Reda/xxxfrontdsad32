import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AkunModel from "../model/AkunModel";
import { useForm } from "react-hook-form";
import "../components/eye.css";

const EntriAkun = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noHp, setNoHp] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    function handleConfirm() {
        simpanAkun();
        setIsModalOpen(false);
    }

    function handleClick() {
        setIsModalOpen(true);
    }

    const simpanAkun = async () => {
        try {
            await AkunModel.simpanAkun({
                noHp: noHp,
                username: username,
                password: password,
                confPassword: confPassword,
                status: status,
            }).then((response) => setMsg(response.data.msg));
            setTimeout(() => {
                navigate("/akun");
            }, 1500);
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

            <h2
                className="title"
                style={{ textAlign: "center", padding: "15px" }}
            >
                TAMBAH AKUN
            </h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={simpanAkun}>
                            <div className="field ">
                                <label className="label">No Hp*</label>
                                <div className="control">
                                    <input
                                        {...register("noHp", {
                                            required: true,
                                            minLength: 5,
                                            maxLength: 20,
                                        })}
                                        type="number"
                                        className="input"
                                        placeholder="0812333333"
                                        value={noHp}
                                        onChange={(e) =>
                                            setNoHp(e.target.value)
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
                                    {errors.noHp?.type === "minLength" && (
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
                                            Minimal 5 digit
                                        </p>
                                    )}
                                    {errors.noHp?.type === "maxLength" && (
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
                                            Maksimal 20 digit
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field ">
                                <label className="label">Username *</label>
                                <div className="control">
                                    <input
                                        {...register("username", {
                                            required: true,
                                            minLength: 3,
                                        })}
                                        type="text"
                                        className="input"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                    {errors.username?.type === "required" && (
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
                                    {errors.username?.type === "minLength" && (
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
                                            Minimal 3 karakter
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field form-group">
                                <label className="label">Password *</label>
                                <div className="control input-group">
                                    <input
                                        type="password"
                                        {...register("password", {
                                            required: true,
                                            minLength: 8,
                                        })}
                                        // type="password"
                                        className="input"
                                        placeholder="**********"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />

                                    {errors.password?.type === "required" && (
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
                                    {errors.password?.type === "minLength" && (
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
                                            Minimal 8 karakter
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">
                                    Konfirmasi Password *
                                </label>
                                <div className="control">
                                    <input
                                        {...register("confPassword", {
                                            required: true,
                                            minLength: 8,
                                        })}
                                        type="password"
                                        className="input"
                                        placeholder="**********"
                                        value={confPassword}
                                        onChange={(e) =>
                                            setConfPassword(e.target.value)
                                        }
                                    />
                                    {errors.confPassword?.type ===
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
                                            Tidak boleh kosong
                                        </p>
                                    )}
                                    {errors.confPassword?.type ===
                                        "minLength" && (
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
                                            Minimal 8 karakter
                                        </p>
                                    )}
                                </div>
                            </div>
                            {user && user.status === "ketua" && (
                                <div className="field">
                                    <label className="label">Status</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select
                                                {...register("status", {
                                                    required: true,
                                                })}
                                                value={status}
                                                onChange={(e) =>
                                                    setStatus(e.target.value)
                                                }
                                            >
                                                <option value="">Status</option>
                                                <option value="ketua">
                                                    Ketua
                                                </option>
                                                <option value="kader">
                                                    Kader
                                                </option>
                                                <option value="bidan">
                                                    Bidan
                                                </option>
                                            </select>
                                            {errors.status?.type ===
                                                "required" && (
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
                                                    Tidak boleh kosong
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {user && user.status === "kader" && (
                                <div className="field">
                                    <label className="label">Status</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select
                                                {...register("status", {
                                                    required: true,
                                                })}
                                                value={status}
                                                onChange={(e) =>
                                                    setStatus(e.target.value)
                                                }
                                            >
                                                <option value="">Status</option>
                                                <option value="ibu">Ibu</option>
                                            </select>
                                            {errors.status?.type ===
                                                "required" && (
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
                                                    Tidak boleh kosong
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="field">
                                <div className="control ">
                                    <button
                                        onClick={() => navigate("/akun")}
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

export default EntriAkun;
