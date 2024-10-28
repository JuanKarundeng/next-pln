"use client";

import Config from "@/lib/config";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [masukData, setMasukData] = useState({});
  const [Harga, setHarga] = useState("");
  const { data: session } = useSession(); // Mengambil session
  const { id } = useParams();

  // Mendapatkan data berdasarkan ID
  const getMasukData = async () => {
    try {
      const response = await axios.get(`${Config.ipPUBLIC}/masuk-data/${id}`);
      setMasukData(response.data);
      setHarga(response.data.harga_disetujui); // Set harga dari database ke input
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getMasukData();
    }
  }, [id]);

  // Fungsi untuk format harga ke Rupiah
  const hargaRP = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  // Fungsi validasi dan update harga disetujui
  const Validasi = async (e) => {
    e.preventDefault();
    try {
      // Update harga_disetujui melalui API PATCH
      await axios.patch(`${Config.ipPUBLIC}/masuk-data/harga/${id}`, {
        harga_disetujui: Harga,
      });
      // Memuat ulang data setelah update berhasil
      getMasukData();
      alert("Harga disetujui berhasil diupdate");
    } catch (error) {
      console.log(error);
    }
  };

  // Cek jika pengguna adalah admin
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="w-full px-2  sm:px-32 py-10 sm:py-10">
      <form onSubmit={Validasi}>
        <div className="bg-white mt-10 sm:mt-20 drop-shadow-lg w-full h-[120vh] sm:h-[50vh] p-2 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
            <div className="">
              <div>
                <p className="mb-4 ">Kilometer Awal (KM)</p>
                <a
                  href={masukData.url_km_awal}
                  className="bg-gray-300 px-4 w-[30rem] sm:w-0 py-2 rounded-md mt-10"
                >
                  Lihat Foto KM Awal
                </a>
              </div>
              <div>
                <p className="my-4 ">Kilometer Akhir (KM)</p>
                <a
                  href={masukData.url_km_akhir}
                  className="bg-gray-300 px-4 w-[30rem] sm:w-0 py-2 rounded-md"
                >
                  Lihat Foto KM Akhir
                </a>
              </div>
              <div>
                <p className="my-4 ">Harga/Pembayaran (Rp)</p>
                <a
                  href={masukData.url_nota}
                  className="bg-gray-300 px-4 w-[30rem] sm:w-0 py-2 rounded-md"
                >
                  Lihat Foto Pembayaran
                </a>
              </div>
            </div>
            <div className="">
              <div>
                <p>Total Pembayaran</p>
                <div className="bg-gray-300 my-2  px-4 py-2 rounded-md">
                  {hargaRP(masukData.pembayaran)}
                </div>
              </div>

              <div className="mt-3 sm:mt-2">
                <p>Harga Yang Diharapkan</p>
                <div className="bg-gray-300 my-2  px-4 py-2 rounded-md">
                  {masukData.harga_diharapkan}
                </div>
              </div>

              {isAdmin && (
                <div className="mt-3 sm:mt-2">
                  <p>Harga Yang Disetujui</p>
                  <div className="bg-gray-300  my-2 px-4 py-2 rounded-md">
                    <input
                      type="number"
                      value={Harga}
                      onChange={(e) => setHarga(e.target.value)}
                      className="w-full"
                      readOnly={!!masukData.harga_disetujui} // Input menjadi readOnly jika harga_disetujui sudah ada
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tombol Simpan hanya untuk admin */}
          {isAdmin && (
            <button
              type="submit"
              className="absolute bottom-2 right-2 px-4 py-1 rounded-md bg-green-400"
              disabled={!!masukData.harga_disetujui} // Disable button jika harga_disetujui sudah ada
            >
              Simpan
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Page;
