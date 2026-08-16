"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleGithubLogin from "@/components/Shared/GoogleGithubLogin";
import { Suspense, useState } from "react";
import loginImage from "../../UI/image/backgroundLogin1.jpg";

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

  const redirectPath = searchParams?.get("redirect") || "/"; // Default redirect path for users

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resp = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: redirectPath,
    });

    if (resp?.ok) {
      const sessionResp = await fetch("/api/auth/session");

      const session = await sessionResp.json();
      console.log(session);

      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else if (session?.user?.role === "user") {
        router.push(redirectPath);
      } else {
        router.push("/");
      }
    } else {
      console.error("Login failed:", resp?.error);
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
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100">
      {/* Left Column - Hero Accent */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative items-center justify-center p-12"
        style={{ backgroundImage: `url(${loginImage.src})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/95 to-sky-950/85 z-0" />
        <div className="relative z-10 text-center space-y-6 max-w-lg">
          <h2 className="text-white text-5xl font-extrabold tracking-tight">
            Welcome to <span className="text-sky-400">E-com Zone</span>
          </h2>
          <p className="text-slate-200 text-lg font-light leading-relaxed">
            Discover a seamless shopping experience. Sign in to access your dashboard, track orders, and view premium products.
          </p>
        </div>
      </div>

      {/* Right Column - Premium Login Form */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 py-12 px-6 sm:px-12 lg:px-16">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-slate-100 p-8 md:p-10 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Sign In
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              to access your <span className="text-sky-600">E-com Zone</span> account
            </p>
          </div>

          {/* Quick Access Account Options */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-3">
              Quick Access Demo Accounts
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAdminLogin}
                className="flex-1 py-2 px-3 border border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-blue-800 text-xs font-bold rounded-lg transition active:scale-95 shadow-sm"
              >
                🛠️ Admin Login
              </button>
              <button
                type="button"
                onClick={handleUserLogin}
                className="flex-1 py-2 px-3 border border-sky-200 bg-sky-50/50 hover:bg-sky-50 text-sky-800 text-xs font-bold rounded-lg transition active:scale-95 shadow-sm"
              >
                👤 User Login
              </button>
            </div>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-slate-600 font-bold text-xs">Email Address</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="input input-bordered w-full focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-slate-600 font-bold text-xs">Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input input-bordered w-full focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Action links */}
            <div className="flex justify-between items-center text-xs pt-1">
              <Link
                href="/forget-password"
                className="font-semibold text-sky-600 hover:text-sky-700 transition"
              >
                Forgot Password?
              </Link>
              <span className="text-slate-500 font-medium">
                New here?{" "}
                <Link href="/signup" className="font-semibold text-sky-600 hover:underline">
                  Create Account
                </Link>
              </span>
            </div>

            {/* Form submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-bold rounded-xl shadow-md transition duration-200 transform hover:scale-[1.01] active:scale-[0.99]"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative px-3 bg-white text-xs font-bold text-slate-400 uppercase tracking-widest">
              Or
            </span>
          </div>

          {/* Social Logins */}
          <div className="flex justify-center">
            <GoogleGithubLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
