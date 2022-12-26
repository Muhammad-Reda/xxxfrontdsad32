import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AkunModel from "../model/AkunModel";
import { useForm } from "react-hook-form";

const UbahAkun = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { noHp } = useParams();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        tampilAkun();
    }, [noHp]);

    const tampilAkun = async () => {
        try {
            const data = await AkunModel.muatAkunNoHp(noHp);
            setUsername(data.username);
            setStatus(data.status);
        } catch (error) {
            setMsg(error.data.msg);
        }
    };

    const updateAkun = async () => {
        try {
            await AkunModel.updateAkun(noHp, {
                username: username,
                password: password,
                confPassword: confPassword,
                status: status,
            }).then((response) => setMsg(response.data.msg));
            setTimeout(() => {
                navigate("/akun");
            }, 2500);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    function handleConfirm() {
        if (password && password.length < 8) {
            setMsg("Password harus lebih dari 8 karakter");
            setIsModalOpen(false);
        } else {
            updateAkun();
            setIsModalOpen(false);
        }
    }

    function handleClick() {
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
            <div className="content-fluid">
                <h1
                    className="title"
                    style={{ textAlign: "center", padding: "20px" }}
                >
                    Ubah Akun
                </h1>
                <div className="card id-shadowless">
                    <div className="card-content">
                        <div className="content">
                            <form
                                onSubmit={updateAkun}
                                className="is-fullwidth"
                            >
                                <div className="field ">
                                    <label className="label">Username</label>
                                    <div className="control">
                                        <input
                                            type="rext"
                                            className="input"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input
                                            type="password"
                                            className="input"
                                            placeholder="**********"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">
                                        Konfirmasi Password
                                    </label>
                                    <div className="control">
                                        <input
                                            type="password"
                                            className="input"
                                            placeholder="**********"
                                            value={confPassword}
                                            onChange={(e) =>
                                                setConfPassword(e.target.value)
                                            }
                                        />
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
                                                        setStatus(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Status
                                                    </option>
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
                                                        setStatus(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="ibu">
                                                        Ibu
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
            </div>
        </>
    );
};

export default UbahAkun;
