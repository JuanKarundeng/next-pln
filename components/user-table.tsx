import { getUsersByIsUserTrue } from "@/lib/data";
import UserTableClient from "./UserTableClient"; // Mengimpor komponen client

const UserTable = async () => {
  const users = await getUsersByIsUserTrue();

  if (!users?.length) return <h1 className="text-2xl">No User Found</h1>;

  return <UserTableClient users={users} />; // Mengirim data pengguna ke komponen client
};

export default UserTable;
