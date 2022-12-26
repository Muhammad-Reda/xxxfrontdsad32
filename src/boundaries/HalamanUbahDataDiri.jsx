import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";
import UbahDataDiri from "../controller/UbahDataDiri";
import Layout from "../components/Layout";

const HalamanUbahDataDiri = () => {
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
                    <div
                        className="content-wrapper"
                        style={{ backgroundColor: "white" }}
                    >
                        <div className="content-fluid">
                            <UbahDataDiri />
                        </div>
                    </div>
                </Layout>
            </div>
        </>
    );
};

export default HalamanUbahDataDiri;
