import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";
import EntriDataKaderBidan from "../controller/EntriDataKaderBidan";
import Layout from "../components/Layout";

const HalamanEntriDataKaderBidan = () => {
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
        if (user && user.status !== "ketua") {
            navigate("/dashboard");
        }
    }, [user, navigate, isSuccess, isError]);
    return (
        <>
            <div className="wrapper">
                <Layout>
                    <div className="content-wrapper">
                        <div
                            className="content-fluid"
                            style={{ backgroundColor: "white" }}
                        >
                            <EntriDataKaderBidan />
                        </div>
                    </div>
                </Layout>
            </div>
        </>
    );
};

export default HalamanEntriDataKaderBidan;
