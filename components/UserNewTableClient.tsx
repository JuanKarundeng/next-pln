"use client"; // Menandakan bahwa ini adalah Client Component

import { useState, useEffect } from "react";
import { TolakUser, updateUserStatus } from "@/lib/actions";
import { getUsersByIsUserFalse } from "@/lib/data"; // Pastikan untuk mengimpor fungsi yang sesuai

// Mendefinisikan tipe data untuk User
// Mendefinisikan tipe data untuk User dengan tipe email yang sesuai
interface User {
  id: string;
  name: string | null;
  email: string | null; // Mengubah tipe email menjadi string | null
  status?: string; // status opsional
}

const UserNewTableClient = () => {
  const [users, setUsers] = useState<User[]>([]); // State untuk menyimpan daftar pengguna
  const [message, setMessage] = useState(""); // State untuk menyimpan pesan
  const [loading, setLoading] = useState(true); // State untuk melacak status pemuatan

  // Memanggil getUsersByIsUserFalse saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersFromApi = await getUsersByIsUserFalse();
        const users: User[] = usersFromApi.map((user) => ({
          ...user,
          email: user.email ?? "", // Mengganti null dengan string kosong jika email null
        }));
        console.log(users); // Periksa data yang diterima
        setUsers(users); // Menyimpan data ke dalam state
      } catch {
        setMessage("Gagal memuat pengguna");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers(); // Panggil fungsi fetchUsers saat komponen dimuat
  }, []); // Dependency array kosong, berarti hanya dijalankan sekali saat komponen pertama kali dimuat

  const handleDeleteUser = async (userId: string) => {
    const response = await TolakUser(userId); // Memanggil fungsi deleteUser
    setMessage(response.message); // Menyimpan pesan hasil ke dalam state
    setUsers(users.filter((user) => user.id !== userId)); // Menghapus user dari daftar tanpa reload
  };

  const handleUpdateUserStatus = async (userId: string) => {
    const response = await updateUserStatus(userId); // Memanggil fungsi updateUserStatus
    setMessage(response.message); // Menyimpan pesan hasil ke dalam state
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "accepted" } : user
      )
    ); // Memperbarui status pengguna tanpa reload
  };

  if (loading) {
    return <div>Loading...</div>; // Menampilkan loading saat data masih dimuat
  }

  return (
    <>
      {message && <div className="text-red-500 mb-4">{message}</div>}
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
              {users.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-3 px-6">
                    Tidak ada pengguna baru.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserNewTableClient;
