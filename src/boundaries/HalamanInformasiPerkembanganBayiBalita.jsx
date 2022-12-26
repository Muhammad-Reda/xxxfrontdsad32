import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/AuthSlice";
import InformasiPerkembanganBayiBalita from "../controller/InformasiPerkembanganBayiBalita";
import InformasiPerkembanganBayiBalita2 from "../controller/InformasiPerkembanganBayiBalita2";

const HalamanInformasiPerkembanganBayiBalita = () => {
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
    }, [navigate, isSuccess, isError]);
    return (
        <>
            {user && user.status !== "ibu" && (
                <div className="wrapper">
                    <Layout>
                        <div
                            className="content-wrapper"
                            style={{ backgroundColor: "white" }}
                        >
                            <div className="content-fluid">
                                <InformasiPerkembanganBayiBalita />
                            </div>
                        </div>
                    </Layout>
                </div>
            )}

            {user && user.status === "ibu" && (
                <div className="wrapper">
                    <Layout>
                        <div
                            className="content-wrapper"
                            style={{ backgroundColor: "white" }}
                        >
                            <div className="content-fluid">
                                <InformasiPerkembanganBayiBalita2 />
                            </div>
                        </div>
                    </Layout>
                </div>
            )}
        </>
    );
};

export default HalamanInformasiPerkembanganBayiBalita;
