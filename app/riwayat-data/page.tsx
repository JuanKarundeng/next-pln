"use client";

import Config from "@/lib/config";
import { formatDate } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// Define the type for each item in masukData
interface MasukData {
  id: string;
  bagian: string;
  plat: string;
  km_awal: number;
  km_akhir: number;
  jumlah_cc: number;
  jenis_bensin: string;
  keterangan: string;
  createdAt: string; // Assuming `createdAt` is a string (ISO format date)
}

const RiwayatData = () => {
  // Set the state to be an array of MasukData objects
  const [masukData, setMasukData] = useState<MasukData[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default ke tanggal hari ini

  const getMasukData = async () => {
    try {
      const response = await axios.get(`${Config.ipPUBLIC}/masuk-data`);
      setMasukData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMasukData();
  }, []);

  // Fungsi untuk memfilter data berdasarkan tanggal
  const filterDataByDate = (data: MasukData[], date: string) => {
    const formattedSelectedDate = new Date(date).toISOString().split("T")[0];
    return data.filter((item) => {
      const itemDate = new Date(item.createdAt).toISOString().split("T")[0];
      return itemDate === formattedSelectedDate;
    });
  };

  const filteredData = filterDataByDate(masukData, selectedDate);

  return (
    <div className="w-full px-2 sm:px-32 py-10">
      <div className="mt-10 sm:mt-20">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-gray-300 p-2 mb-3 rounded-md"
        />
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th className="border border-black px-24 py-2">Bagian</th>
                <th className="border border-black px-8 py-2">Plat Nomor</th>
                <th className="border border-black px-8 py-2">
                  Kilometer Awal
                </th>
                <th className="border border-black px-8 py-2">
                  Kilometer Akhir
                </th>
                <th className="border border-black px-8 py-2">Jumlah CC</th>
                <th className="border border-black px-8 py-2">Jenis Bensin</th>
                <th className="border border-black px-8 py-2">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-black px-6 py-4">
                      {item.bagian}
                    </td>
                    <td className="border border-black px-3 py-4">
                      {item.plat}
                    </td>
                    <td className="border border-black px-3 py-4">
                      {item.km_awal}
                    </td>
                    <td className="border border-black px-3 py-4">
                      {item.km_akhir}
                    </td>
                    <td className="border border-black px-3 py-4">
                      {item.jumlah_cc}
                    </td>
                    <td className="border border-black px-3 py-4">
                      {item.jenis_bensin}
                    </td>
                    <td className="border border-black text-center">
                      <Link
                        href={`/detail-riwayat/${item.id}`}
                        className={`px-3 py-1 ${
                          item.keterangan === "Hati-Hati"
                            ? "bg-yellow-400"
                            : item.keterangan === "Aman"
                            ? "bg-green-400"
                            : item.keterangan === "Bahaya"
                            ? "bg-red-500"
                            : "bg-gray-200"
                        }`}
                      >
                        {item.keterangan}
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-black px-6 py-4 text-center"
                    colSpan={7}
                  >
                    Data Tidak Ada untuk Tanggal {formatDate(selectedDate)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiwayatData;
