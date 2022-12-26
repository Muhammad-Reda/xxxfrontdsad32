import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";
import Layout from "../components/Layout";
import UbahdataPerkembanganBayiBalita from "../controller/UbahDataPerkembanganBayiBalita";

const HalamanUbahDataPerkembanganBayiBalita = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user, isSuccess } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError && !isSuccess) {
            navigate("/");
        }
        if (user && user.status !== "kader") {
            navigate("/dashboard");
        }
    }, [user, isSuccess, navigate, isError]);
    return (
        <>
            <div className="wrapper">
                <Layout>
                    <div
                        className="content-wrapper"
                        style={{ backgroundColor: "white" }}
                    >
                        <div className="content-fluid">
                            <UbahdataPerkembanganBayiBalita />
                        </div>
                    </div>
                </Layout>
            </div>
        </>
    );
};

export default HalamanUbahDataPerkembanganBayiBalita;
