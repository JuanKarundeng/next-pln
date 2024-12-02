"use client"; // Menambahkan ini agar komponen berjalan di client side

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ubahSandi } from "@/lib/actions";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";

const UbahKataSandi = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi apakah kata sandi dan konfirmasi kata sandi cocok
    if (newPassword !== confirmPassword) {
      setErrorMessage("Kata sandi baru dan konfirmasi kata sandi tidak cocok.");
      setSuccessMessage(""); // Hapus pesan sukses jika ada
      return;
    }

    // Mendapatkan userId dari session
    const session = await getSession();
    const userId = session?.user.id;

    if (!userId) {
      setErrorMessage("Gagal mendapatkan informasi pengguna.");
      return;
    }

    // Memanggil fungsi ubahSandi
    try {
      const response = await ubahSandi(userId, newPassword);
      if (response.message === "Kata sandi berhasil diubah.") {
        setSuccessMessage(response.message);
        setErrorMessage("");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan pada server.");
    }
  };

  return (
    <section id="support" className="px-4 md:px-8 2xl:px-0">
      <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
        <div className="flex mt-10 flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="w-full rounded-lg bg-white p-7 shadow-xl"
          >
            <h2 className="mb-10 text-3xl font-semibold text-black">
              Ubah Kata Sandi
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-7">
                <input
                  type="password"
                  placeholder="Masukkan Kata Sandi Baru"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border-b bg-transparent pb-3.5 focus:border-black focus:outline-none"
                  required
                />
              </div>

              <div className="mb-7">
                <input
                  type="password"
                  placeholder="Konfirmasi Kata Sandi Baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border-b bg-transparent pb-3.5 focus:border-black focus:outline-none"
                  required
                />
              </div>

              {errorMessage && (
                <div className="text-red-500 mb-4">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="text-green-500 mb-4">{successMessage}</div>
              )}

              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600"
              >
                Ubah Kata Sandi
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UbahKataSandi;
