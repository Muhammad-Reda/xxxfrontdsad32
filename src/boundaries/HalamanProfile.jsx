import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";
import ProfileController from "../controller/Profile";

const HalamanProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, isSuccess } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError && !isSuccess) {
            navigate("/");
        }
    }, [navigate, isSuccess, isError]);
    return (
        <>
            <div className="wrapper">
                <Layout>
                    <div className="content-wrapper">
                        <div className="content-fluid">
                            <ProfileController />
                        </div>
                    </div>
                </Layout>
            </div>
        </>
    );
};

export default HalamanProfile;
