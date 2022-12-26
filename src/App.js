import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./boundaries/Dashboard";
import HalamanProfile from "./boundaries/HalamanProfile";
import HalamanInformasiPosyandu from "./boundaries/HalamanInformasiPosyandu";
import HalamanLogin from "./boundaries/HalamanLogin";
import HalamanPendataanBayiBalita from "./boundaries/HalamanPendataanBayiBalita";
import HalamanPendataanIbu from "./boundaries/HalamanPendataanIbu";
import HalamanPendataanKaderBidan from "./boundaries/HalamanPendataanKaderBidan";
import HalamanPengelolaanAkun from "./boundaries/HalamanPengelolaanAkun";
import HalamanPerkembanganBayiBalita from "./boundaries/HalamanPerkembanganBayiBalita";
import HalamanInformasiPerkembanganBayiBalita from "./boundaries/HalamanInformasiPerkembanganBayiBalita";
import HalamanUbahAkun from "./boundaries/HalamanUbahAkun";
import HalamanEntriAkun from "./boundaries/HalamanEntriAkun";
import HalamanUbahDataDiri from "./boundaries/HalamanUbahDataDiri";
import HalamanEntriDataKaderBidan from "./boundaries/HalamanEntriDataKaderBidan";
import HalamanUbahDataKaderBidan from "./boundaries/HalamanUbahDataKaderBidan";
import HalamanUbahDataIbu from "./boundaries/HalamanUbahDataIbu";
import HalamanEntriDataIbu from "./boundaries/HalamanEntriDataIbu";
import HalamanEntriDataBayiBalita from "./boundaries/HalamanEntriDataBayiBalita";
import HalamanUbahDataBayiBalita from "./boundaries/HalamanUbahDataBayiBalita";
import HalamanEntriDataPerkembanganBayiBalita from "./boundaries/HalamanEntriDataPerkembanganBayiBalita";
import HalamanUbahDataPerkembanganBayiBalita from "./boundaries/HalamanUbahDataPerkembanganBayiBalita";
import HalamanUbahInformasiPosyandu from "./boundaries/HalamanUbahInformasiPosyandu";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HalamanLogin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<HalamanProfile />} />
                <Route
                    path="/profile/edit/:noHp"
                    element={<HalamanUbahDataDiri />}
                />
                <Route path="/akun" element={<HalamanPengelolaanAkun />} />
                <Route path="/akun/add" element={<HalamanEntriAkun />} />
                <Route path="/akun/edit/:noHp" element={<HalamanUbahAkun />} />
                <Route
                    path="/petugas"
                    element={<HalamanPendataanKaderBidan />}
                />
                <Route
                    path="/petugas/add"
                    element={<HalamanEntriDataKaderBidan />}
                />
                <Route
                    path="/petugas/edit/:nik"
                    element={<HalamanUbahDataKaderBidan />}
                />

                <Route path="/ibu" element={<HalamanPendataanIbu />} />
                <Route path="/ibu/add" element={<HalamanEntriDataIbu />} />
                <Route path="/ibu/edit/:nik" element={<HalamanUbahDataIbu />} />
                <Route path="/bayi" element={<HalamanPendataanBayiBalita />} />
                <Route
                    path="/bayi/add"
                    element={<HalamanEntriDataBayiBalita />}
                />
                <Route
                    path="/bayi/edit/:id"
                    element={<HalamanUbahDataBayiBalita />}
                />
                <Route
                    path="/perkembangan"
                    element={<HalamanPerkembanganBayiBalita />}
                />

                <Route
                    path="/perkembangan/add"
                    element={<HalamanEntriDataPerkembanganBayiBalita />}
                />

                <Route
                    path="/perkembangan/edit/:id"
                    element={<HalamanUbahDataPerkembanganBayiBalita />}
                />

                <Route
                    path="/informasi"
                    element={<HalamanInformasiPerkembanganBayiBalita />}
                />
                <Route
                    path="/informasi/:noHp"
                    element={<HalamanInformasiPerkembanganBayiBalita />}
                />
                <Route path="/berita" element={<HalamanInformasiPosyandu />} />
                <Route
                    path="/berita/edit/:id"
                    element={<HalamanUbahInformasiPosyandu />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
