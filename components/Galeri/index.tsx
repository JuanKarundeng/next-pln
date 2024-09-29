"use client";
import { motion } from "framer-motion";
import axios from "axios";
import React, { useState } from "react";
import Config from "@/lib/config";
import Image from "next/image";

const Galeri = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // Untuk pesan modal
  const [isSuccess, setIsSuccess] = useState(false); // Untuk mengatur status keberhasilan

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const gambar = e.target.files?.[0]; // ?. digunakan untuk memastikan file ada
    if (gambar) {
      setFile(gambar);
      setPreview(URL.createObjectURL(gambar));
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview("");
  };

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setModalMessage(" field harus diisi!"); // Pesan untuk modal
      setIsSuccess(false); // Set modal untuk kegagalan (warna merah)
      setOpenModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${Config.ipPUBLIC}/galeri`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setModalMessage("Gambar berhasil ditambahkan!");
      setIsSuccess(true); // Set modal untuk keberhasilan (warna hijau)
      setOpenModal(true);
      resetForm(); // Reset form setelah berhasil
      setTimeout(() => {
        setOpenModal(false); // Sembunyikan modal setelah beberapa detik
      }, 3000); // 3 detik
    } catch (error) {
      console.error(error);
      setModalMessage("Gagal menambahkan gambar!");
      setIsSuccess(false); // Set modal untuk kegagalan (warna merah)
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
      {/* <!-- ===== Galeri Start ===== --> */}
      <section id="support" className="px-4 md:px-8 2xl:px-0">
        <div className="">
          <div className="">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full rounded-lg bg-white p-4 shadow-solid-8 dark:border dark:border-strokedark xl:p-15"
            >
              <h2 className="mb-15 text-3xl font-semibold text-black xl:text-sectiontitle2">
                Masukkan Gambar Dokumentasi Dinas
              </h2>

              <form onSubmit={sendData} method="POST" className="py-4">
                <div className="mb-7 ">
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

                <div className="flex flex-wrap items-center gap-4 xl:justify-end">
                  <button
                    aria-label="send message"
                    className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark"
                  >
                    Kirim
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
        </div>
        {/* Popup Modal */}
        {openModal && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

            {/* Modal */}
            <div
              id="popup-modal"
              tabIndex={-1}
              className="fixed inset-0 z-50 flex justify-center items-center p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full"
            >
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
      {/* <!-- ===== Galeri End ===== --> */}
    </>
  );
};

export default Galeri;
