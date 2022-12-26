import axios from "axios";

const InformasiPosyandu = {
    async muatSemuaInformasiPosyandu() {
        const response = await axios.get(
            "http://localhost:5000/informasiPosyandu"
        );
        return response.data;
    },

    async muatInformasiPosyanduId(id) {
        const response = await axios.get(
            `http://localhost:5000/informasiPosyandu/${id}`
        );
        return response.data;
    },

    async updateInformasiPosyandu(id, data) {
        const response = await axios.patch(
            `http://localhost:5000/informasiPosyandu/${id}`,
            data
        );
        return response;
    },
};

export default InformasiPosyandu;
