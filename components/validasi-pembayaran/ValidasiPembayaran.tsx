import Config from "@/lib/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ValidasiPembayaran = () => {
  const [masukData, setMasukData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const getMasukData = async (date) => {
    try {
      const response = await axios.get(`${Config.ipPUBLIC}/masuk-data`);

      // Filter data berdasarkan validasi "sudah" dan tanggal yang dipilih
      const filteredData = response.data.filter(
        (item) => item.validasi === "sudah" && item.createdAt.startsWith(date)
      );

      setMasukData(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMasukData(selectedDate); // Memuat data untuk tanggal hari ini saat pertama kali halaman dimuat
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value); // Ubah tanggal berdasarkan pilihan pengguna
  };

  const hargaRP = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  // Fungsi untuk mengunduh data dalam bentuk PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Laporan Pembayaran - Tanggal: ${selectedDate}`, 10, 10);

    const tableColumn = [
      "Bagian",
      "Plat Nomor",
      "KM Awal",
      "KM Akhir",
      "Biaya Pembayaran",
      "Biaya Disetujui",
    ];
    const tableRows = [];

    masukData.forEach((item) => {
      const rowData = [
        item.bagian,
        item.plat,
        item.km_awal,
        item.km_akhir,
        item.pembayaran,
        hargaRP(item.harga_disetujui),
      ];
      tableRows.push(rowData);
    });

    // Menambahkan tabel ke PDF
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save(`Laporan_Pembayaran_${selectedDate}.pdf`);
  };

  return (
    <div className="w-full py-1 sm:py-10">
      <div className="flex justify-between">
        <input
          type="date"
          className="bg-gray-300 p-2 rounded-md mb-2"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <button
          className="bg-gray-300 text-sm sm:text-md py-2 px-10 rounded-md mb-2"
          onClick={generatePDF}
        >
          Unduh PDF
        </button>
      </div>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th className="border border-black text-sm sm:text-md px-24 py-2">
                Bagian
              </th>
              <th className="border border-black text-sm sm:text-md px-8 py-2">
                Plat Nomor
              </th>
              <th className="border border-black text-sm sm:text-md px-8 py-2">
                KM Awal
              </th>
              <th className="border border-black text-sm sm:text-md px-8 py-2">
                KM Akhir
              </th>
              <th className="border border-black text-sm sm:text-md px-8 py-2">
                Biaya Pembayaran
              </th>
              <th className="border border-black text-sm sm:text-md px-8 py-2">
                Biaya Disetujui
              </th>
            </tr>
          </thead>
          <tbody>
            {masukData.map((item, index) => (
              <tr key={index + 1}>
                <td className="border border-black text-sm sm:text-md px-6 py-4">
                  {item.bagian}
                </td>
                <td className="border border-black text-sm sm:text-md px-3 py-4">
                  {item.plat}
                </td>
                <td className="border border-black text-sm sm:text-md px-3 py-4">
                  {item.km_awal}
                </td>
                <td className="border border-black text-sm sm:text-md px-3 py-4">
                  {item.km_akhir}
                </td>
                <td className="border border-black text-sm sm:text-md px-3 py-4">
                  {item.pembayaran}
                </td>
                <td className="border border-black text-sm sm:text-md px-3 py-4">
                  {hargaRP(item.harga_disetujui)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ValidasiPembayaran;
