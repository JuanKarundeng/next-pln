import { auth } from "@/auth";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = async () => {
  const session = await auth();

  return (
    <div className="max-w-screen-x mx-auto py-6 p-4">
      <h1 className="text-2xl">Dashboard</h1>
      <h2 className="text-xl mt-5 sm:mt-10">
        Welcome Back: <span className="font-bold">{session?.user?.name}</span>
      </h2>
    </div>
  );
};

export default Dashboard;
