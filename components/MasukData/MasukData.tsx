"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "@/lib/config";

const MasukData = () => {
  const [bagian, setBagian] = useState("");
  // const [plat, setPlat] = useState("");
  const [kar1, setKar1] = useState("");
  const [kar2, setKar2] = useState("");
  const [kar3, setKar3] = useState("");
  const [km_awal, setKm_awal] = useState("");
  const [km_akhir, setKm_akhir] = useState("");
  const [jumlah_cc, setJumlah_cc] = useState("");
  const [jenis_bensin, setJenis_bensin] = useState("");
  const [pembayaran, setPembayaran] = useState("");
  const [foto_nota, setFoto_nota] = useState<File | null>(null);
  const [foto_km_awal, setFoto_km_awal] = useState<File | null>(null);
  const [foto_km_akhir, setFoto_km_akhir] = useState<File | null>(null);

  const [preview_nota, setPreview_nota] = useState<string | null>(null);
  const [preview_km_awal, setPreview_km_awal] = useState<string | null>(null);
  const [preview_km_akhir, setPreview_km_akhir] = useState<string | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const plat = `${kar1}${" "}${kar2}${" "}${kar3}`;

  console.log(plat);

  // Fungsi untuk handle file input dan preview
  const loadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const image = e.target.files?.[0];
    if (image) {
      setFile(image);
      setPreview(URL.createObjectURL(image)); // Untuk menampilkan preview
    }
  };

  const resetForm = () => {
    setBagian("");
    setKar1("");
    setKar2("");
    setKar3("");
    setKm_awal("");
    setKm_akhir("");
    setJumlah_cc("");
    setJenis_bensin("");
    setPembayaran("");
    setFoto_nota(null);
    setFoto_km_awal(null);
    setFoto_km_akhir(null);
    setPreview_km_awal(null);
    setPreview_km_akhir(null);
    setPreview_nota(null);
  };

  const saveData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !bagian ||
      !kar1 ||
      !kar2 ||
      !kar3 ||
      !km_awal ||
      !km_akhir ||
      !jumlah_cc ||
      !jenis_bensin ||
      !pembayaran ||
      !foto_nota ||
      !foto_km_awal ||
      !foto_km_akhir
    ) {
      setModalMessage("Semua data harus diisi!");
      setIsSuccess(false);
      setOpenModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("bagian", bagian);
    formData.append("plat", plat);
    formData.append("km_awal", km_awal);
    formData.append("km_akhir", km_akhir);
    formData.append("jumlah_cc", jumlah_cc);
    formData.append("jenis_bensin", jenis_bensin);
    formData.append("pembayaran", pembayaran);
    formData.append("foto_nota", foto_nota as Blob);
    formData.append("foto_km_awal", foto_km_awal as Blob);
    formData.append("foto_km_akhir", foto_km_akhir as Blob);

    try {
      if (km_akhir <= km_awal) {
        setModalMessage("Km Akhir Harus Lebih Besar Dari Km Awal");
      } else {
        await axios.post(`${Config.ipPUBLIC}/masuk-data`, formData, {});
        setModalMessage("Data berhasil ditambahkan!");
      }
      setIsSuccess(true);
      setOpenModal(true);
      resetForm();
      setTimeout(() => {
        setOpenModal(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setModalMessage("Gagal menambahkan data!");
      setIsSuccess(false);
      setOpenModal(true);
    }
  };

  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <section id="support" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg "></div>

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full rounded-lg bg-white p-7 shadow-xl"
            >
              <h2 className="mb-10 text-3xl font-semibold text-black">
                Masukkan Data
              </h2>

              <form onSubmit={saveData}>
                <div className="mb-10 flex  gap-7 ">
                  <select
                    value={bagian}
                    onChange={(e) => setBagian(e.target.value)}
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none "
                  >
                    <option value="" hidden disabled>
                      Pilih Bagian
                    </option>
                    <option value="Keuangan Dan Umum">Keuangan dan Umum</option>
                    <option value="Niaga Dan Pemasaran">
                      Niaga dan Pemasaran
                    </option>
                    <option value="Jaringan">Jaringan</option>
                    <option value="Transaksi Energi Listrik">
                      Transaksi Energi Listrik
                    </option>
                    <option value="Perencanaan">Perencanaan</option>
                    <option value="Kontruksi">Konstruksi</option>
                    <option value="K3L">K3L</option>
                    <option value="Pengadaan">Pengadaan</option>
                  </select>
                </div>

                <div className="mb-7">
                  <h1>Plat Nomor</h1>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="DB"
                      value={kar1}
                      maxLength={2} // Membatasi panjang input menjadi 2
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase(); // Mengubah ke huruf kapital
                        if (/^[A-Za-z]*$/.test(value)) {
                          setKar1(value);
                        }
                      }}
                      className="w-[10%] px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="1234"
                      value={kar2}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,4}$/.test(value)) {
                          // Membatasi angka hanya 4 digit
                          setKar2(value);
                        }
                      }}
                      className="px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="XY"
                      value={kar3}
                      maxLength={3} // Membatasi panjang input menjadi 3
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase(); // Mengubah ke huruf kapital
                        if (/^[A-Za-z]*$/.test(value)) {
                          setKar3(value);
                        }
                      }}
                      className="w-[10%] px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-10 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="number"
                    placeholder="Masukkan Kilometer Awal"
                    value={km_awal}
                    onChange={(e) => setKm_awal(e.target.value)}
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none lg:w-1/2"
                  />

                  <input
                    type="number"
                    placeholder="Masukkan Kilometer Akhir"
                    value={km_akhir}
                    onChange={(e) => setKm_akhir(e.target.value)}
                    className="w-full border-b border-stroke bg-transparent pb-3.5 mt-5 sm:mt-0 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none lg:w-1/2"
                  />
                </div>

                <div className="mb-10 flex gap-7">
                  <input
                    type="number"
                    placeholder="Jumlah Pembayaran"
                    value={pembayaran}
                    onChange={(e) => setPembayaran(e.target.value)}
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none"
                  />
                </div>

                <div className="mb-7 flex flex-col gap-7">
                  <select
                    value={jumlah_cc}
                    onChange={(e) => setJumlah_cc(e.target.value)}
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none"
                  >
                    <option value="" hidden disabled>
                      Pilih Jumlah CC
                    </option>
                    <option value="1000">1000</option>
                    <option value="1200">1200</option>
                    <option value="1300">1300</option>
                    <option value="1500">1500</option>
                    <option value="1800">1800</option>
                    <option value="2000">2000</option>
                    <option value="2500">2500</option>
                  </select>
                </div>

                <div className="mb-7 flex flex-col gap-7">
                  <select
                    value={jenis_bensin}
                    onChange={(e) => setJenis_bensin(e.target.value)}
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none"
                  >
                    <option value="" hidden disabled>
                      Pilih Jenis Bensin
                    </option>
                    <option value="Pertalite">Pertalite</option>
                    <option value="Pertamax">Pertamax</option>
                    <option value="Pertamax Turbo">Pertamax Turbo</option>
                    <option value="Solar">Solar</option>
                    <option value="Dexlite">Dexlite</option>
                    <option value="Pertamax Dex">Pertamina Dex</option>
                  </select>
                </div>

                {/* Field Input lain */}

                <div className="mb-7 flex flex-col gap-7">
                  <label
                    htmlFor="foto_nota"
                    className="font-semibold text-gray-700"
                  >
                    Unggah Foto Nota:
                  </label>
                  <label
                    htmlFor="foto_nota"
                    className="file-input file-input-bordered w-1/4 cursor-pointer py-2 px-4 border border-gray-600 rounded-md text-center bg-gray-100 hover:bg-gray-200"
                  >
                    Pilih Berkas
                  </label>
                  <input
                    id="foto_nota"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      loadImage(e, setFoto_nota, setPreview_nota)
                    }
                    className="hidden"
                  />
                  {preview_nota && (
                    <img
                      src={preview_nota}
                      alt="Preview Nota"
                      className="mt-4 h-40 w-40 object-cover border border-gray-300 rounded-md"
                    />
                  )}
                </div>

                <div className="mb-7 flex flex-col gap-7">
                  <label
                    htmlFor="foto_km_awal"
                    className="font-semibold text-gray-700"
                  >
                    Unggah Foto Kilometer Awal:
                  </label>
                  <label
                    htmlFor="foto_km_awal"
                    className="file-input file-input-bordered w-1/4 cursor-pointer py-2 px-4 border border-gray-600 rounded-md text-center bg-gray-100 hover:bg-gray-200"
                  >
                    Pilih Berkas
                  </label>
                  <input
                    id="foto_km_awal"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      loadImage(e, setFoto_km_awal, setPreview_km_awal)
                    }
                    className="hidden"
                  />
                  {preview_km_awal && (
                    <img
                      src={preview_km_awal}
                      alt="Preview KM Awal"
                      className="mt-4 h-40 w-40 object-cover border border-gray-300 rounded-md"
                    />
                  )}
                </div>

                <div className="mb-7 flex flex-col gap-7">
                  <label
                    htmlFor="foto_km_akhir"
                    className="font-semibold text-gray-700"
                  >
                    Unggah Foto Kilometer Akhir:
                  </label>
                  <label
                    htmlFor="foto_km_akhir"
                    className="file-input file-input-bordered w-1/4 cursor-pointer py-2 px-4 border border-gray-600 rounded-md text-center bg-gray-100 hover:bg-gray-200"
                  >
                    Pilih Berkas
                  </label>
                  <input
                    id="foto_km_akhir"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      loadImage(e, setFoto_km_akhir, setPreview_km_akhir)
                    }
                    className="hidden"
                  />
                  {preview_km_akhir && (
                    <img
                      src={preview_km_akhir}
                      alt="Preview KM Akhir"
                      className="mt-4 h-40 w-40 object-cover border border-gray-300 rounded-md"
                    />
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 xl:justify-end">
                  <button
                    type="submit"
                    aria-label="send message"
                    className="inline-flex items-center gap-2.5 rounded-full bg-blue-500 px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blue-600"
                  >
                    Simpan
                    <svg
                      className="fill-white"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
          {openModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="relative w-full max-w-md">
                <div className="bg-white text-center rounded-lg shadow-lg p-6">
                  <p>{modalMessage}</p>
                  <button
                    onClick={() => setOpenModal(false)}
                    className="bg-gray-100 hover:bg-gray-200 border border-gray-600 rounded-md mt-4 px-4 py-2 text-black"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MasukData;
