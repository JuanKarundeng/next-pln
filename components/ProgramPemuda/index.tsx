"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "@/lib/config";
import Image from "next/image";

const ProgramPemuda = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [admin, setAdmin] = useState("");
  const [kontak, setKontak] = useState("");
  const [preview, setPreview] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // ?. digunakan untuk memastikan file ada
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const resetForm = () => {
    setTitle("");
    setAdmin("");
    setKontak("");
    setFile(null);
    setPreview("");
  };

  const saveGambar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !file || !admin || !kontak) {
      setModalMessage("Semua field harus diisi!");
      setIsSuccess(false);
      setOpenModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("nama_program", title);
    formData.append("nama_pembuat_program", admin);
    formData.append("kontak_admin_program", kontak);

    try {
      await axios.post(`${Config.ipPUBLIC}/program`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setModalMessage("Program berhasil ditambahkan!");
      setIsSuccess(true);
      setOpenModal(true);
      resetForm();
      setTimeout(() => setOpenModal(false), 3000);
    } catch (error) {
      console.error(error);
      setModalMessage("Gagal menambahkan berita!");
      setIsSuccess(false);
      setOpenModal(true);
    }
  };

  useEffect(() => setOpenModal(false), []);

  return (
    <>
      <section id="support" className="px-4 md:px-8 2xl:px-0">
        <div className="">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full rounded-lg bg-white p-4 shadow-solid-8 dark:border dark:border-strokedark xl:p-15"
          >
            <h2 className="mb-15 text-3xl font-semibold text-black xl:text-sectiontitle2">
              Masukkan Program Kategori Pemuda
            </h2>

            <form onSubmit={saveGambar} method="POST" className="py-4">
              <div className="mb-7">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload Gambar (PNG, JPG, JPEG)
                </label>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={loadImage}
                  className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
                {preview && (
                  <Image src={preview} alt="Preview" className="mt-4" />
                )}
              </div>

              <div className="mb-12 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                <input
                  type="text"
                  placeholder="Nama Program"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark"
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={admin}
                  onChange={(e) => setAdmin(e.target.value)}
                  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark"
                />
              </div>

              <div className="mb-12 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                <input
                  type="text"
                  placeholder="No Telepon"
                  value={kontak}
                  onChange={(e) => setKontak(e.target.value)}
                  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 xl:justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark"
                >
                  Kirim
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Popup Modal */}
        {openModal && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed inset-0 z-50 flex justify-center items-center p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full">
              <div className="relative w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow">
                  <div className="p-6 text-center">
                    <h3
                      className={`text-lg font-normal ${
                        isSuccess ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {modalMessage}
                    </h3>
                    <button
                      onClick={() => setOpenModal(false)}
                      className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white hover:bg-blackho dark:bg-btndark"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ProgramPemuda;
