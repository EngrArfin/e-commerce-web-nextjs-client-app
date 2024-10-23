/* eslint-disable @typescript-eslint/no-unused-vars */
// next-auth.d.ts
import NextAuth from "next-auth";

// Extend the default `session.user` type to include the `id` field
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the `id` field to the user object in the session
      email: string;
      name?: string;
      image?: string;
    };
  }

  interface User {
    id: string; // Ensure that the user object also has the `id` field
    email: string;
    name?: string;
    image?: string;
  }
}
