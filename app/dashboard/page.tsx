import { auth } from "@/auth";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = async () => {
  const session = await auth();

  return (
    <div className="max-w-screen-x mx-auto py-24 p-4">
      <h1 className="text-2xl">Beranda</h1>
      <h2 className="text-xl mt-5 sm:mt-10">
        Selamat Datang: <span className="font-bold">{session?.user?.name}</span>
      </h2>
    </div>
  );
};

export default Dashboard;
