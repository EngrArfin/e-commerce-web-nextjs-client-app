"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const GoogleGithubLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const path = searchParams.get("redirect");
  const session = useSession();
  const handleSocialLogin = (provider) => {
    const resp = signIn(provider, {
      redirect: true,
      callbackUrl: path ? path : "/",
    });
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
