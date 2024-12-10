"use client";

import { useParams } from "next/navigation"; // For Next.js app routing
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Config from "@/lib/config";
import { useSession } from "next-auth/react";
import { config } from "process";
import { url } from "inspector";

// Define types for data
interface MasukData {
  url_km_awal: string;
  url_km_akhir: string;
  url_nota: string;
  pembayaran: number;
  harga_diharapkan: string;
  harga_disetujui?: string | number;
}

// Adjust the Params interface to match Next.js expected type
interface Params {
  [key: string]: string; // This allows any string parameter, including 'id'
}

const Page = () => {
  const [masukData, setMasukData] = useState<MasukData | null>(null);
  const [Harga, setHarga] = useState<string>("");

  const { data: session } = useSession(); // Mengambil session

  // Get params and destructure to get the 'id'
  const params = useParams<Params>(); // Get the params
  const id = params?.id ?? ""; // Fallback to an empty string if id is null or undefined

  const getMasukData = useCallback(async () => {
    if (!id) return; // Prevent fetching if id is not available
    try {
      const response = await axios.get(`${Config.ipPUBLIC}/masuk-data/${id}`);
      setMasukData(response.data);
      setHarga(response.data.harga_disetujui || "");
    } catch (error) {
      console.log(error);
      alert("Error fetching data.");
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getMasukData();
    }
  }, [id, getMasukData]);

  // Function to format price to IDR
  const hargaRP = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const Validasi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Harga) {
      alert("Harga harus diisi.");
      return;
    }

    try {
      await axios.patch(`${Config.ipPUBLIC}/masuk-data/harga/${id}`, {
        harga_disetujui: Harga,
      });
      getMasukData();
      alert("Harga disetujui berhasil diupdate");
    } catch (error) {
      console.log(error);
      alert("Failed to update harga.");
    }
  };

  const isAdmin = session?.user?.role === "admin";

  if (!masukData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full px-2 sm:px-32 py-10 sm:py-10">
      <form onSubmit={Validasi}>
        <div className="bg-white mt-10 sm:mt-20 drop-shadow-lg w-full h-[120vh] sm:h-[50vh] p-2 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
            <div>
              <div>
                <p className="mb-4">Kilometer Awal (KM)</p>
                <a
                  href={`${Config.ipPUBLIC}/img/${masukData.url_km_awal}`}
                  className="bg-gray-300 px-4 w-[30rem] sm:w-0 py-2 rounded-md mt-10"
                >
                  Lihat Foto Kilometer Awal
                </a>
              </div>
              <div>
                <p className="my-4">Kilometer Akhir (KM)</p>
                <a
                  href={`${Config.ipPUBLIC}/img/${masukData.url_km_akhir}`}
                  className="bg-gray-300 px-4 w-[30rem] sm:w-0 py-2 rounded-md"
                >
                  Lihat Foto Kilometer Akhir
                </a>
              </div>
              <div>
                <p className="my-4">Bukti Pembayaran (Rp)</p>
                <a
                  href={`${Config.ipPUBLIC}/img/${masukData.url_nota}`}
                  className="bg-gray-300 px-4 w-[30rem] sm:w-0 py-2 rounded-md"
                >
                  Lihat Foto Pembayaran
                </a>
              </div>
            </div>
            <div>
              <div>
                <p>Total Pembayaran</p>
                <div className="bg-gray-300 my-2 px-4 py-2 rounded-md">
                  {hargaRP(masukData.pembayaran)}
                </div>
              </div>

              <div className="mt-3 sm:mt-2">
                <p>Harga Yang Diharapkan</p>
                <div className="bg-gray-300 my-2 px-4 py-2 rounded-md">
                  {masukData.harga_diharapkan}
                </div>
              </div>

              {isAdmin && (
                <div className="mt-3 sm:mt-2">
                  <p>Harga Yang Disetujui</p>
                  <div className="bg-gray-300 my-2 px-4 py-2 rounded-md">
                    <input
                      type="number"
                      value={Harga}
                      onChange={(e) => setHarga(e.target.value)}
                      className="w-full"
                      readOnly={!!masukData.harga_disetujui}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {isAdmin && (
            <button
              type="submit"
              className="absolute bottom-2 right-2 px-4 py-1 rounded-md bg-green-400"
              disabled={!!masukData.harga_disetujui}
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
