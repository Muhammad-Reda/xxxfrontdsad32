import React, { useEffect } from "react";
import Layout from "../components/Layout";
import EntriAkun from "../controller/EntriAkun";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";

const HalamanEntriAkun = () => {
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
        if (user && user.status !== "ketua" && user.status !== "kader") {
            navigate("/dashboard");
        }
    }, [user, navigate, isSuccess, isError]);

    return (
        <div className="wrapper">
            <Layout>
                <div
                    className="content-wrapper"
                    style={{ backgroundColor: "white" }}
                >
                    <EntriAkun />
                </div>
            </Layout>
        </div>
    );
};

export default HalamanEntriAkun;
