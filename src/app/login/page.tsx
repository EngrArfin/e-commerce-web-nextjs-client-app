/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import Link from "next/link";
import login from "../../UI/image/backgroundLogin1.jpg"; // Ensure the path is correct
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleGithubLogin from "@/components/Shared/GoogleGithubLogin";

export type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.target as any).email.value;
    const password = (event.target as any).password.value;
    const resp = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (resp?.status === 200) {
      router.push("/");
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center bg-gray-100 py-14 px-12 sm:px-8 lg:px-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          <span className="text-sky-600">Login in E-com Zone</span>
        </h2>
        <div className="flex gap-6">
          <div className="hidden lg:block w-1/2">
            <Image
              src={login}
              width={900}
              height={200}
              alt="login page"
              className="rounded-md object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <Link
                  href="/forget-password"
                  className="block text-sm font-medium text-sky-500"
                >
                  Forget Password
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-900 to-sky-600 text-white font-semibold rounded-lg shadow-lg hover:from-sky-900 hover:to-sky-900 focus:outline-none focus:ring-4 focus:ring-sky-500 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="text-center mt-4 text-sm text-gray-600">
              have no account?{" "}
              <Link href="/signup" className="text-sky-600 hover:underline">
                sign up
              </Link>
            </p>
            <div className="text-center mt-6 text-gray-500 divider">Or</div>

            <GoogleGithubLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
