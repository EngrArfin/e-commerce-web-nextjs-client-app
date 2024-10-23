/* eslint-disable @typescript-eslint/no-unused-vars */

import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

interface User {
  id: string;
  email: string;
  name?: string;
}

const handler = NextAuth({
  session: {
    strategy: "jwt", // Use JWT for session management
    maxAge: 30 * 24 * 60 * 60, // Session expiration (30 days)
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const { email, password } = credentials;

        // Connect to the database
        const db = await connectDB();
        if (!db) {
          throw new Error("Database connection failed");
        }

        // Find the user by email
        const currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) {
          return null; // Return null if user is not found
        }

        // Compare the provided password with the stored hashed password
        const passwordMatched = bcrypt.compareSync(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          return null; // Return null if password does not match
        }

        // Map the MongoDB document to a User object
        const user: User = {
          id: currentUser._id.toString(), // MongoDB stores _id as ObjectId, convert to string
          email: currentUser.email,
          name: currentUser.name, // Include additional fields if necessary
        };

        return user; // Return the User object
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If user is returned, add id and email to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Add the user id and email to the session
      session.user = {
        ...session.user, // Preserve existing fields (name, email, image)
        id: token.id as string, // Add id from the token
        email: token.email as string,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };
