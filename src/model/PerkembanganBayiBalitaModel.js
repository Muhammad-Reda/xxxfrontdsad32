import axios from "axios";

const PerkembanganBayiBalitaModel = {
    async muatSemuaPerkembanganBayiBalita(keyword, page, limit) {
        const response = await axios.get(
            `http://localhost:5000/perkembangan?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        return response.data;
    },

    async muatDataBayi(keywordNama, page, limit) {
        const response = await axios.get(
            `http://localhost:5000/informasiPerkembangan?search_query=${keywordNama}&page=${page}&limit=${limit}`
        );
        return response.data;
    },

    async muatDataBayiOlehIbu(noHp) {
        const response = await axios.get(
            `http://localhost:5000/perkembangan/ibu/${noHp}`
        );
        return response.data[0];
    },

    async muatDataChart(keywordTahun, idBayi) {
        const response = await axios.get(
            `http://localhost:5000/perkembanganChart?tahun=${keywordTahun}&idBayi=${idBayi}`
        );
        return response.data;
    },

    async muatDataImunisasi(idBayi) {
        const response = await axios.get(
            `http://localhost:5000/perkembanganImunisasi?idBayi=${idBayi}`
        );
        return response.data;
    },

    async muatPerkembanganId(id) {
        const response = await axios.get(
            `http://localhost:5000/perkembangan/${id}`
        );
        return response.data;
    },

    async simpanPerkembanganBayiBalita(data) {
        const response = await axios.post(
            `http://localhost:5000/perkembangan`,
            data
        );
        return response;
    },

    async updatePerkembanganBayiBalita(id, data) {
        const response = await axios.patch(
            `http://localhost:5000/perkembangan/${id}`,
            data
        );
        return response;
    },

    async hapusPerkembanganBayiBalita(id) {
        const response = await axios.delete(
            `http://localhost:5000/perkembangan/${id}`
        );
        return response;
    },
};

export default PerkembanganBayiBalitaModel;
