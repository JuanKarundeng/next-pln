import { getUsersByIsUserFalse } from "@/lib/data";
import UserNewTableClient from "./UserNewTableClient";

const UserNewTable = async () => {
  const users = await getUsersByIsUserFalse();
  const jumlahData = users?.length;

  if (!users?.length)
    return (
      <div className="">
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
              <tr>
                <td className="py-3 px-6 text-center" colSpan={3}>
                  Belum Ada Pendaftar Baru
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

  return <UserNewTableClient users={users} jumlahData={jumlahData} />; // Mengirim data pengguna ke komponen client
};

export default UserNewTable;
