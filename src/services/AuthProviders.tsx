"use client";
import React, { ReactNode } from "react";

interface AuthProvidersProps {
  children: ReactNode;
}

const AuthProviders: React.FC<AuthProvidersProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default AuthProviders;

{
  /* <SessionProvider>
            {children}
        </SessionProvider> */
}
