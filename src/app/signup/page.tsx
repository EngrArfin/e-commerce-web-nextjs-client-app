/* eslint-disable @next/next/no-img-element */
"use client";

import GoogleGithubLogin from "@/components/Shared/GoogleGithubLogin";
import axios from "axios";
import Link from "next/link";
import { Suspense } from "react";
import signupImage from "../../UI/image/backgroundsignup1.jpg";

const SignUp = () => {
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const newUser = {
      name: target.name.value,
      email: target.email.value,
      password: target.password.value,
    };

    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/signup/api`,
        newUser,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (resp.status === 200) {
        target.reset();
      }
    } catch (error) {
      console.error("Sign Up failed", error);
    }
  };
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500 font-semibold">Loading...</div>}>
      <div className="flex flex-col md:flex-row min-h-screen bg-slate-100">
        {/* Left Column - Hero Accent */}
        <div
          className="hidden md:flex md:w-1/2 bg-cover bg-center relative items-center justify-center p-12"
          style={{ backgroundImage: `url(${signupImage.src})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/95 to-sky-950/85 z-0" />
          <div className="relative z-10 text-center space-y-6 max-w-lg">
            <h2 className="text-white text-5xl font-extrabold tracking-tight">
              Join <span className="text-sky-400">E-com Zone</span>
            </h2>
            <p className="text-slate-200 text-lg font-light leading-relaxed">
              Create an account to start shopping. Save items to your cart, place orders securely, and manage your account.
            </p>
          </div>
        </div>

        {/* Right Column - Premium Signup Form */}
        <div className="flex-1 flex items-center justify-center bg-slate-50 py-12 px-6 sm:px-12 lg:px-16">
          <div className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-slate-100 p-8 md:p-10 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                Create Account
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                to get started with <span className="text-sky-600">E-com Zone</span>
              </p>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-slate-600 font-bold text-xs">Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="input input-bordered w-full focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-slate-600 font-bold text-xs">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
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
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-bold rounded-xl shadow-md transition duration-200 transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  Sign Up
                </button>
              </div>
            </form>

            {/* Toggle Link */}
            <p className="text-center text-xs text-slate-500 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-sky-600 hover:underline">
                Sign In
              </Link>
            </p>

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
    </Suspense>
  );
};

export default SignUp;
