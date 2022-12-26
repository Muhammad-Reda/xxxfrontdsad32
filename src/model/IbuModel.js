import axios from "axios";

const IbuModel = {
    async muatSemuaIbu(keyword, page, limit) {
        const response = await axios.get(
            `http://localhost:5000/ibu?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        return response.data;
    },

    async muatIbuNik(nik) {
        const response = await axios.get(`http://localhost:5000/ibu/${nik}`);
        return response.data;
    },

    async simpanIbu(data) {
        const response = await axios.post("http://localhost:5000/ibu", data);
        return response;
    },

    async updateIbu(nik, data) {
        const response = await axios.patch(
            `http://localhost:5000/ibu/edit/${nik}`,
            data
        );
        return response;
    },

    async hapusIbu(nik) {
        const response = await axios.delete(`http://localhost:5000/ibu/${nik}`);
        return response;
    },
};

export default IbuModel;
