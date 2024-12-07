"use client";
import dynamic from "next/dynamic";

// Dynamically import the Login component with SSR disabled
const Login = dynamic(() => import("./(auth)/login/page"), { ssr: false });

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto py-6 p-4">
      <div className="flex justify-center items-center mt-20">
        Selamat Datang!
      </div>
      <div className="flex justify-center items-center">
        <Login />
      </div>
    </div>
  );
}
