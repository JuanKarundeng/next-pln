"use client"; // Menandakan bahwa ini adalah Client Component

import { useState } from "react";
import { TolakUser, updateUserStatus } from "@/lib/actions";

const UserNewTableClient = ({ users, jumlahData }) => {
  const [message, setMessage] = useState(""); // State untuk menyimpan pesan

  const handleDeleteUser = async (userId) => {
    const response = await TolakUser(userId); // Memanggil fungsi deleteUser
    setMessage(response.message); // Menyimpan pesan hasil ke dalam state
    alert("User Berhasil Ditolak");
    window.location.reload();
  };

  const handleUpdateUserStatus = async (userId) => {
    const response = await updateUserStatus(userId); // Memanggil fungsi updateUserStatus
    setMessage(response.message); // Menyimpan pesan hasil ke dalam state
    alert("User Berhasil DiTerima");
    window.location.reload();
  };

  return (
    <>
      {message && <div className="text-red-500">{message}</div>}{" "}
      <div className="px-3">
        <div className="overflow-x-auto">
          <table className="w-full bg-white mt-10 sm:mt-20">
            <thead className="border-b border-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-sm">Nama</th>
                <th className="py-3 px-6 text-left text-sm">Alamat Surel</th>
                <th className="py-3 px-6 text-left text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">
                    <div className="flex gap-2">
                      <button
                        className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                        onClick={() => handleUpdateUserStatus(user.id)} // Memanggil fungsi untuk memperbarui status
                      >
                        Terima
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                        onClick={() => handleDeleteUser(user.id)} // Memanggil fungsi saat tombol diklik
                      >
                        Tolak
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserNewTableClient;
