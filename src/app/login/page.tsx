/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import Link from "next/link";
import login from "../../UI/image//backgroundLogin1.jpg";
import { useRouter } from "next/navigation";
/* import { signIn } from "next-auth/react";
import { loginUser } from "@/utils/actions/loginUser";
import { useForm } from "react-hook-form"; */

export type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const handleLogin = async () => {};

  const router = useRouter();
  /*  const {

    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
 */

  /* const onSubmit = async (data: FormValues) => {
    console.log(data);
    try {
      const res = await loginUser(data);
      if (res.accessToken) {
        alert(res.message);
        localStorage.setItem("accessToken", res.accessToken);
        router.push("/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.message);
      throw new Error(err.message);
    }
  }; */
  return (
    <div className="max-h-screen flex items-center justify-center bg-gray-100 py-14 px-12 sm:px-8 lg:px-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          <span className="text-sky-600">Login in E-com Zone </span>
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
            <form /* onSubmit={handleSubmit(onSubmit)} */ className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  /*  {...register("email")} */
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
                  /*  {...register("password")} */
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

            <div className="flex justify-center gap-4 mt-4">
              <button
                /* onClick={() =>
                  signIn("github", {
                    callbackUrl: "http://localhost:3000/dashboard",
                  })
                } */
                className="p-3 bg-white border rounded-full shadow-md hover:shadow-lg"
              >
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  width={30}
                  height={30}
                  alt="github logo"
                />
              </button>

              <button
                className="p-3 bg-white border rounded-full shadow-md hover:shadow-lg"
                /*  onClick={() =>
                  signIn("google", {
                    callbackUrl: "http://localhost:3000/dashboard",
                  })
                } */
              >
                <Image
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                  width={30}
                  height={30}
                  alt="google logo"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
