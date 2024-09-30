import FormLogin from "@/components/auth/form-login";
import { GithubButton, GoogleButton } from "@/components/auth/social-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const Login = ({ searchParams }: { searchParams?: { error?: string } }) => {
  const params = searchParams?.error;

  return (
    <div className="p-6 space-y-4 flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-gray-900">Masuk Ke Akun Anda</h1>
      {params === "OAuthAccountNotLinked" ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">
            Account already use by other provider.
          </span>
        </div>
      ) : null}
      <FormLogin />
    </div>
  );
};

export default Login;
