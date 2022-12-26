import axios from "axios";

const AkunModel = {
    async muatSemuaAKun(keyword, page, limit) {
        const response = await axios.get(
            `http://localhost:5000/akun1?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        return response.data;
    },

    async muatSemuaAKun2(keyword, page, limit) {
        const response = await axios.get(
            `http://localhost:5000/akun2?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        return response.data;
    },

    async muatAkun(noHp) {
        const response = await axios.get(
            `http://localhost:5000/profile/${noHp}`
        );
        return response.data;
    },

    async muatAkunNoHp(noHp) {
        const response = await axios.get(`http://localhost:5000/akun/${noHp}`);
        return response.data;
    },

    async muatProfile(noHp) {
        const response = await axios.get(
            `http://localhost:5000/profile/${noHp}`
        );
        return response.data;
    },

    async updateProfile(noHp, data) {
        const response = await axios.patch(
            `http://localhost:5000/profile/${noHp}`,
            data
        );
        return response;
    },

    async simpanAkun(data) {
        const response = await axios.post("http://localhost:5000/akun", data);
        return response;
    },

    async updateAkun(noHp, data) {
        const response = await axios.patch(
            `http://localhost:5000/akun/${noHp}`,
            data
        );
        return response;
    },

    async hapusAkun(noHp) {
        const response = await axios.delete(
            `http://localhost:5000/akun/${noHp}`
        );
        return response;
    },
};

export default AkunModel;
