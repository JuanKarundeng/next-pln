import { getUsersByIsUserFalse } from "@/lib/data";
import UserNewTableClient from "@/components/UserNewTableClient";

/// Mendefinisikan tipe data User yang lebih fleksibel untuk menerima nilai null
interface User {
  id: string;
  name: string | null; // name bisa null
  email: string | null; // email bisa null
  role: string; // role tetap bertipe string
  image: string | null; // image bisa null
  isUser: boolean | null; // isUser bisa null
  emailVerified: Date | null; // emailVerified bisa null
  password: string | null; // password bisa null
}

const PendaftarBaruPage = async () => {
  // Menangani nilai undefined dengan memberikan array kosong sebagai default
  const users: User[] = (await getUsersByIsUserFalse()) || [];

  if (!users.length) return <h1 className="text-2xl">No User Found</h1>;

  // Mengirim data pengguna ke komponen client dengan tipe yang sesuai
  return <UserNewTableClient users={users} />;
};

export default PendaftarBaruPage;
