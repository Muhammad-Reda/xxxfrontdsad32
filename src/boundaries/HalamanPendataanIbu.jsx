import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";
import PendataanIbu from "../controller/PendataanIbu";

const HalamanPendataanIbu = () => {
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
                            <PendataanIbu />
                        </div>
                    </div>
                </Layout>
            </div>
        </>
    );
};

export default HalamanPendataanIbu;
