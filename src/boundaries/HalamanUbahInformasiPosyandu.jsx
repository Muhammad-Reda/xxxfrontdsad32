import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";
import Layout from "../components/Layout";
import UbahInformasiPosyandu from "../controller/UbahInformasiPosyandu";

const HalamanUbahInformasiPosyandu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, isSuccess, user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError && !isSuccess) {
            navigate("/");
        }
        if (user && user.status !== "ketua") {
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
                            <UbahInformasiPosyandu />
                        </div>
                    </div>
                </Layout>
            </div>
        </>
    );
};

export default HalamanUbahInformasiPosyandu;
