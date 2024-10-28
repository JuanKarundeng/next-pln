"use client"; // Tetap menggunakan Client Component karena ada interaksi UI

import axios from "axios";
import Config from "@/lib/config";
import React, { useEffect, useState } from "react";

const Bensin = () => {
  const [bensinData, setBensinData] = useState({});
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling
  const [newPrices, setNewPrices] = useState({}); // State untuk menyimpan harga baru

  // Fungsi untuk mengambil data bensin
  const getBensin = async () => {
    try {
      const response = await axios.get(`${Config.ipPUBLIC}/ubah-harga`);
      // Mengambil objek pertama dari array
      setBensinData(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  console.log(bensinData);

  // Fungsi untuk menangani pembaruan harga bensin
  const updateBensin = async (fuelType) => {
    try {
      const price = newPrices[fuelType]; // Ambil harga baru untuk jenis bensin ini
      await axios.put(`${Config.ipPUBLIC}/ubah-harga/1`, {
        [fuelType]: price, // Mengirimkan harga baru untuk jenis bensin ini
      });
      await getBensin(); // Re-fetch the data after update
    } catch (error) {
      console.error("Error updating price:", error);
      setError("Failed to update price");
    }
  };

  useEffect(() => {
    getBensin();
  }, []); // Run on component mount

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>{error}</div>; // Display error message

  const fuelTypes = [
    { name: "Pertalite", id: "pertalite" },
    { name: "Pertamax", id: "pertamax" },
    { name: "Pertamax Turbo", id: "pertamax_turbo" },
    { name: "Solar", id: "solar" },
    { name: "Dexlite", id: "dexlite" },
    { name: "Pertamina Dex", id: "pertamina_dex" },
  ];

  return (
    <div className="shadow-xl sm:p-10 rounded-md mt-4 ">
      <div className="overflow-x-auto">
        <table className="w-full bg-white mt-3">
          <thead className="border-b border-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm">Jenis Bensin</th>
              <th className="py-3 px-6 text-left text-sm">Harga Lama</th>
              <th className="py-3 px-6 text-left text-sm">Harga Baru</th>
            </tr>
          </thead>
          <tbody>
            {fuelTypes.map((fuel) => (
              <tr key={fuel.id}>
                <td className="py-3 px-6">{fuel.name}</td>
                <td className="py-3 px-6">{bensinData[fuel.id] || "N/A"}</td>
                <td className="py-3 px-6">
                  <input
                    type="number" // Set type to number
                    defaultValue={bensinData[fuel.id]} // Set default value to current price
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewPrices((prev) => ({
                        ...prev,
                        [fuel.id]: value, // Simpan harga baru di state
                      }));
                    }} // Call updateBensin on change
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tombol Kirim */}
      <div className="flex justify-end pb-2 pr-2 mt-4">
        <button
          onClick={() => {
            // Panggil updateBensin untuk setiap jenis bensin
            Object.keys(newPrices).forEach((fuelType) => {
              if (newPrices[fuelType]) {
                updateBensin(fuelType);
              }
            });
          }} // Update this if you have specific save logic
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default Bensin;
