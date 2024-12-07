"use client";

import { useSearchParams } from "next/navigation";
import FormLogin from "@/components/auth/form-login";
import { Suspense } from "react";

const Login = () => {
  const searchParams = useSearchParams();
  const error = searchParams ? searchParams.get("error") : null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-6 mt-10 sm:mt-20 space-y-4 flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-900">Masuk Ke Akun Anda</h1>

        {error === "OAuthAccountNotLinked" && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
            role="alert"
          >
            <span className="font-medium">
              Akun sudah terhubung dengan penyedia lain.
            </span>
          </div>
        )}

        <FormLogin />
      </div>
    </Suspense>
  );
};

export default Login;
