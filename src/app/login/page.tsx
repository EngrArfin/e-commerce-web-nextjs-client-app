"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleGithubLogin from "@/components/Shared/GoogleGithubLogin";
import { Suspense } from "react";
import loginImage from "../../UI/image/backgroundLogin1.jpg";
import { useState } from "react";

export type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent router={router} />
    </Suspense>
  );
};

interface LoginContentProps {
  router: ReturnType<typeof useRouter>;
}

const LoginContent = ({ router }: LoginContentProps) => {
  const searchParams = useSearchParams();
  const path = searchParams?.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resp = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: path || "/admin",
    });

    if (resp?.status === 200) {
      router.push("/admin");
    }
  };

  const handleAdminLogin = () => {
    setEmail("admin191@gmail.com");
    setPassword("Admin191");
  };

  const handleUserLogin = () => {
    setEmail("user191@gmail.com");
    setPassword("User191");
  };

  return (
    <div className="flex h-screen">
      {/* Left side for the image */}
      <div
        className="w-1/2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginImage.src})` }}
      >
        <div className="flex justify-center items-center h-full bg-black opacity-40">
          <h2 className="text-white text-4xl font-semibold">
            Welcome to E-com Zone
          </h2>
        </div>
      </div>

      {/* Right side for the form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50 py-6 px-12 sm:px-8 lg:px-10">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden p-8">
          <h2 className="text-3xl font-medium text-center mb-6 text-gray-800">
            <span className="text-sky-600">Login</span> to E-com Zone
          </h2>

          {/* Admin and User Login Buttons */}
          <div className="flex justify-between mb-6">
            <button
              onClick={handleAdminLogin}
              className="px-4 py-2 bg-blue-900 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Admin Login
            </button>
            <button
              onClick={handleUserLogin}
              className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-lg hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              User Login
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <Link
                  href="/forget-password"
                  className="text-sm text-sky-600 hover:text-sky-700"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="text-sm text-sky-600">
                <p>
                  I don not have an account?{" "}
                  <Link href="/signup" className="hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
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

          <div className="text-center mt-8 text-gray-500">
            <span className="divider">Or</span>
          </div>

          <GoogleGithubLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
