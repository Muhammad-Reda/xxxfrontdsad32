import axios from "axios";

const KaderBidanModel = {
    async muatSemuaKaderBidan(keyword, page, limit) {
        const response = await axios.get(
            `http://localhost:5000/kaderBidan?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        return response.data;
    },

    async muatKaderBidanNik(nik) {
        const response = await axios.get(
            `http://localhost:5000/kaderBidan/${nik}`
        );
        return response.data;
    },

    async simpanKaderBidan(data) {
        const response = await axios.post(
            "http://localhost:5000/kaderBidan",
            data
        );
        return response;
    },

    async updateKaderBidan(nik, data) {
        const response = await axios.patch(
            `http://localhost:5000/kaderBidan/${nik}`,
            data
        );
        return response;
    },

    async hapusKaderBidan(nik) {
        const response = await axios.delete(
            `http://localhost:5000/kaderBidan/${nik}`
        );
        return response;
    },
};

export default KaderBidanModel;
