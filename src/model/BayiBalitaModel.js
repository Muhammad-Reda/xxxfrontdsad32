import axios from "axios";

const BayiBalitaModel = {
    async muatSemuaBayiBalita(keyword, page, limit) {
        const response = await axios.get(
            `http://localhost:5000/bayi?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        return response.data;
    },

    async muatBayiBalitaId(id) {
        const response = await axios.get(`http://localhost:5000/bayi/${id}`);
        return response.data;
    },

    async updataBayiBalita(id, data) {
        const response = await axios.patch(
            `http://localhost:5000/bayi/${id}`,
            data
        );
        return response;
    },

    async simpanBayiBalita(data) {
        const response = await axios.post(`http://localhost:5000/bayi`, data);
        return response;
    },

    async hapusBayiBalita(id) {
        const response = await axios.delete(`http://localhost:5000/bayi/${id}`);
        return response;
    },
};

export default BayiBalitaModel;
