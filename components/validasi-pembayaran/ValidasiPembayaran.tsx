import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Config from "@/lib/config";
import Print from "./Print";
import { tanggalFormat } from "@/utils/helper";

type MasukData = {
  validasi: string;
  createdAt: string;
  bagian: string;
  plat: string;
  km_awal: number;
  km_akhir: number;
  pembayaran: number;
  harga_disetujui: number;
};

const ValidasiPembayaran = () => {
  const [masukData, setMasukData] = useState<MasukData[]>([]);
  const [openModalPDF, setOpenModalPDF] = useState(false);
  const [namaTTD, setNamaTTD] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [printVisible, setPrintVisible] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(true); // Menambahkan state untuk kontrol visibilitas tabel
  const ComponentToPDF = useRef<HTMLDivElement | null>(null); //

  const getMasukData = async (date: string) => {
    try {
      const response = await axios.get<MasukData[]>(
        `${Config.ipPUBLIC}/masuk-data`
      );
      const filteredData = response.data.filter(
        (item) => item.validasi === "sudah" && item.createdAt.startsWith(date)
      );
      setMasukData(filteredData);
    } catch (error) {
      console.error("Gagal memuat data:", error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      getMasukData(selectedDate);
    }
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const hargaRP = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleSavePDF = async () => {
    if (!namaTTD) {
      alert("Masukkan nama penandatangan!");
      return;
    }

    const element = ComponentToPDF.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      const pdfBlob = pdf.output("blob");
      const urlPDF = URL.createObjectURL(pdfBlob);
      window.open(urlPDF, "_blank");
      window.location.reload();

      // Menyembunyikan tabel dan modal setelah menyimpan
      setIsTableVisible(false); // Menyembunyikan tabel
      setNamaTTD("");
      setOpenModalPDF(false);
      setPrintVisible(false); // Menyembunyikan <Print> setelah berhasil mengunduh
    } catch (error) {
      console.error("Gagal menghasilkan PDF:", error);
    }
  };

  return (
    <div className="w-full py-1 sm:py-10">
      {/* Modal untuk nama penandatangan */}
      {openModalPDF && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-30 z-[60]">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">Nama Penandatangan</h3>
            <input
              type="text"
              value={namaTTD}
              onChange={(e) => setNamaTTD(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
              placeholder="Masukkan nama penandatangan"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setOpenModalPDF(false);
                  setPrintVisible(false); // Menyembunyikan <Print> jika batal
                  setIsTableVisible(true); // Menampilkan tabel kembali jika batal
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleSavePDF}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Area yang akan dicetak */}
      <div
        ref={ComponentToPDF}
        style={{ display: printVisible ? "block" : "none" }}
      >
        <Print dataGet={masukData} tgl={selectedDate} namaTTD={namaTTD} />
      </div>
      {isTableVisible && (
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <input
              type="date"
              className="bg-gray-300 p-2 rounded-md"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <button
              className="bg-gray-300 text-sm sm:text-md py-2 px-10 rounded-md"
              onClick={() => {
                setOpenModalPDF(true);
                setPrintVisible(true); // Menampilkan <Print> saat klik unduh PDF
                setIsTableVisible(false); // Menyembunyikan tabel saat klik unduh PDF
              }}
            >
              Unduh PDF
            </button>
          </div>
          <div className="overflow-x-auto">
            {masukData.length > 0 ? (
              <table className="border-collapse w-full">
                <thead>
                  <tr>
                    {[
                      "Bagian",
                      "Plat Nomor",
                      "Kilometer Awal",
                      "Kilometer Akhir",
                      "Total Pembayaran",
                      "Harga Disetujui",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="border border-black text-sm sm:text-md px-8 py-2"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {masukData.map((item, index) => (
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
                        {item.pembayaran}
                      </td>
                      <td className="border border-black px-3 py-4">
                        {hargaRP(item.harga_disetujui)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="border-collapse w-full">
                <thead>
                  <tr>
                    {[
                      "Bagian",
                      "Plat Nomor",
                      "Kilometer Awal",
                      "Kilometer Akhir",
                      "Total Pembayaran",
                      "Harga Disetujui",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="border border-black text-sm sm:text-md px-8 py-2"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="border border-black px-6 py-4 text-center"
                      colSpan={6}
                    >
                      Belum Ada Data Pada Tanggal {tanggalFormat(selectedDate)}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidasiPembayaran;
