import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";
import EntriDataPerkembanganBayiBalita from "../controller/EntriDataPerkembanganBayiBalita";
import Layout from "../components/Layout";

const HalamanEntriDataPerkembanganBayiBalita = () => {
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
    }, [user, navigate, isSuccess, isError]);
    return (
        <>
            <div className="wrapper">
                <Layout>
                    <div
                        className="content-wrapper"
                        style={{ backgroundColor: "white" }}
                    >
                        <div className="content-fluid">
                            <EntriDataPerkembanganBayiBalita />
                        </div>
                    </div>
                </Layout>
            </div>
        </>
    );
};

export default HalamanEntriDataPerkembanganBayiBalita;
