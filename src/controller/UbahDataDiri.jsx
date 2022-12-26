import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AkunModel from "../model/AkunModel";

const UbahDataDiri = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { noHp } = useParams();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordBaru, setPasswordBaru] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        tampilProfile();
    }, [noHp]);

    const tampilProfile = async () => {
        try {
            const data = await AkunModel.muatProfile(noHp);
            setUsername(data.username);
        } catch (error) {
            setMsg(error.data.msg);
        }
    };

    const updateProfile = async () => {
        try {
            await AkunModel.updateProfile(noHp, {
                username: username,
                password: password,
                passwordBaru: passwordBaru,
            }).then((response) => setMsg(response.data.msg));
            setTimeout(() => {
                navigate("/profile");
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
        } else if (password && !passwordBaru) {
            setMsg("Password baru harus diisi ");
            setIsModalOpen(false);
        } else {
            updateProfile();
            setIsModalOpen(false);
        }
    }

    function handleClick(e) {
        e.preventDefault();
        // Tampilkan pop up konfirmasi sebelum mengeksekusi function
        setIsModalOpen(true);
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
                UBAH PROFILE
            </h1>
            <div className="card id-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateProfile} className="is-fullwidth">
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
                                <label className="label">Password Lama</label>
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
                                <label className="label">Password Baru</label>
                                <div className="control">
                                    <input
                                        type="password"
                                        className="input"
                                        placeholder="**********"
                                        value={passwordBaru}
                                        onChange={(e) =>
                                            setPasswordBaru(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="control ">
                                <button
                                    onClick={() => navigate("/profile")}
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

export default UbahDataDiri;
