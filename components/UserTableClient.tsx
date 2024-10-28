"use client";

import { resetPassword, TolakUser } from "@/lib/actions";

const UserTableClient = ({ users }) => {
  const handleDeleteUser = async (userId) => {
    const response = await TolakUser(userId); // Memanggil fungsi deleteUser
    alert(response.message); // Menampilkan pesan hasil
    window.location.reload(); // Memuat ulang halaman
  };

  const handleResetPassword = async (idUser) => {
    try {
      const response = await resetPassword(idUser); // Memanggil fungsi resetPassword dengan userId
      alert(response.message); // Menampilkan pesan hasil
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Error resetting password");
    }
  };

  return (
    <div>
      <div className="overflow-x-auto px-3">
        <table className="w-full bg-white mt-10 sm:mt-20 ">
          <thead className="border-b border-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm">Name</th>
              <th className="py-3 px-6 text-left text-sm">Email</th>
              <th className="py-3 px-6 text-left text-sm">Role</th>
              <th className="py-3 px-6 text-left text-sm">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.role}</td>
                <td className="py-3 px-6 flex gap-2">
                  <button
                    onClick={() => handleResetPassword(user.id)} // Pastikan idUser diteruskan
                    className="bg-green-500 text-white py-1 text-sm sm:text-md px-3 rounded hover:bg-green-600"
                  >
                    Reset Password
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white py-1 text-sm sm:text-md px-3 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTableClient;
