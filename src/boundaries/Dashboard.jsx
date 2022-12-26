import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";
import DashboardController from "../controller/Dashboard";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, isSuccess } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     dispatch(getMe());
    // }, [dispatch]);

    useEffect(() => {
        dispatch(getMe());
        if (isError && !isSuccess) {
            navigate("/");
        }
    }, [navigate, isError, isSuccess, dispatch]);

    return (
        <div className="wrapper">
            <Layout>
                <div
                    className="content-wrapper"
                    style={{ backgroundColor: "white" }}
                >
                    <div className="content-fluid">
                        <DashboardController />
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Dashboard;
