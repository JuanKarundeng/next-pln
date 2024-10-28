import { getUsersByIsUserFalse } from "@/lib/data";
import UserNewTableClient from "./UserNewTableClient";

const UserNewTable = async () => {
  const users = await getUsersByIsUserFalse();

  if (!users?.length) return <h1 className="text-2xl">No User Found</h1>;

  return <UserNewTableClient users={users} />; // Mengirim data pengguna ke komponen client
};

export default UserNewTable;
