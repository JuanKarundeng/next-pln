"use client";

import Config from "@/lib/config";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RiwayatData = () => {
  const [masukData, setMasukData] = useState([]);
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
  const filterDataByDate = () => {
    if (!selectedDate) return masukData;

    const formattedSelectedDate = new Date(selectedDate)
      .toISOString()
      .split("T")[0];

    return masukData.filter((item) => {
      const itemDate = new Date(item.createdAt).toISOString().split("T")[0];
      return itemDate === formattedSelectedDate;
    });
  };

  return (
    <div className="w-full px-2  sm:px-32 py-10">
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
                <th className="border border-black px-8 py-2">KM Awal</th>
                <th className="border border-black px-8 py-2">KM Akhir</th>
                <th className="border border-black px-8 py-2">Jumlah CC</th>
                <th className="border border-black px-8 py-2">Jenis Bensin</th>
                <th className="border border-black px-8 py-2">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {filterDataByDate().map((item, index) => (
                <tr key={index + 1}>
                  <td className="border border-black px-6 py-4">
                    {item.bagian}
                  </td>
                  <td className="border border-black px-3 py-4">{item.plat}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Input date untuk memilih tanggal */}
    </div>
  );
};

export default RiwayatData;
