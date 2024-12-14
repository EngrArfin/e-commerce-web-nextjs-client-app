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
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-h-screen flex items-center justify-center bg-slate-200 py-3 px-12 sm:px-8 lg:px-10">
        <div className="flex w-full max-w-5xl bg-slate-50 shadow-lg rounded-lg overflow-hidden">
          {/* Image Section */}
          <div className="w-1/2 hidden lg:block">
            <img
              src={signupImage.src}
              alt="Sign Up Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2 px-8 py-10">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">
              <span className="text-sky-600">Sign Up</span> for Your Account
            </h2>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
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
                  placeholder="Enter your password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-900 to-sky-600 text-white font-semibold rounded-lg shadow-lg hover:from-sky-900 hover:to-sky-900 focus:outline-none focus:ring-4 focus:ring-sky-500 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="text-center mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-sky-600 hover:underline">
                Login
              </Link>
            </p>

            <div className="text-center mt-8 text-gray-500">
              <span className="divider">Or</span>
            </div>

            <GoogleGithubLogin />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SignUp;
