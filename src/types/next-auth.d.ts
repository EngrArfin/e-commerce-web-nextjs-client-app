// next-auth.d.ts
import { DefaultSession } from "next-auth";

// Extend the default NextAuth Session and User types
declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string; // role should be required for the user
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string; // Ensure role is available in the session
    } & DefaultSession["user"];
  }
}
