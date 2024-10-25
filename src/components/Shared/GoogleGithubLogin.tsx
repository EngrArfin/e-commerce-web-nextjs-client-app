"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const GoogleGithubLogin = () => {
  const router = useRouter();

  const handleSocialLogin = async (provider) => {
    const resp = await signIn(provider, { redirect: false });
    if (resp?.error) {
      console.log("Error during social login:", resp.error);
    } else if (resp?.ok) {
      console.log("Social login successful");
      router.push("/"); // Redirect after successful login
    }
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={() => handleSocialLogin("github")}
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
        onClick={() => handleSocialLogin("google")}
        className="p-3 bg-white border rounded-full shadow-md hover:shadow-lg"
      >
        <Image
          src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
          width={30}
          height={30}
          alt="google logo"
        />
      </button>
    </div>
  );
};

export default GoogleGithubLogin;
