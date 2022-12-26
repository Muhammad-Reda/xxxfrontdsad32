import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";
import PengelolaanAkun1 from "../controller/PengelolaanAkun1";
import PengellolaanAkun2 from "../controller/PengelolaanAkun2";

const HalamanPengelolaanAkun = () => {
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
    }, [user, isSuccess, navigate, isError]);

    return (
        <>
            {user && user.status === "ketua" && (
                <div className="wrapper">
                    <Layout>
                        <div
                            className="content-wrapper"
                            style={{ backgroundColor: "white" }}
                        >
                            <div className="content-fluid">
                                <PengelolaanAkun1 />
                            </div>
                        </div>
                    </Layout>
                </div>
            )}
            {user && user.status === "kader" && (
                <div className="wrapper">
                    <Layout>
                        <div
                            className="content-wrapper"
                            style={{ backgroundColor: "white" }}
                        >
                            <div className="content-fluid">
                                <PengellolaanAkun2 />
                            </div>
                        </div>
                    </Layout>
                </div>
            )}
        </>
    );
};

export default HalamanPengelolaanAkun;
