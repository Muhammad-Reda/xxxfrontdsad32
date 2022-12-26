import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";
import "../components/Profile.css";
import profilefoto from "../components/profile.png";
import AkunModel from "../model/AkunModel";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        muatAkun();
    }, []);

    const muatAkun = async () => {
        const data = await AkunModel.muatAkun(user.noHp);
        setProfile(data);
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div className="kartu" style={{ marginTop: "50px" }}>
                    <img src={profilefoto} className="gambar" />
                    <div className="status">{profile.status}</div>
                    <div className="username">({profile.username})</div>
                    <div className="nohp">0{profile.noHp}</div>
                    <Link
                        to={`/profile/edit/${profile.noHp}`}
                        className="buttonedit"
                    >
                        Atur Profile <IoSettings />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Profile;
