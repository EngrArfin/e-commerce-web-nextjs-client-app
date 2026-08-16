import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const db = await connectDB();
        if (!db) {
          throw new Error("Failed to connect to the database");
        }

        const currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) {
          throw new Error("No user found with the provided email");
        }

        const passwordMatched = await bcrypt.compare(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          throw new Error("Incorrect password");
        }

        return {
          id: currentUser._id.toString(),
          email: currentUser.email,
          name: currentUser.name,
          role: currentUser.role,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      const { name, email, image, role } = user;

      if (account?.provider === "github" || account?.provider === "google") {
        if (!email) {
          return false;
        }
      }

      try {
        const db = await connectDB();
        const userCollection = db?.collection("users");

        const userExist = await userCollection?.findOne({ email });

        if (!userExist) {
          await userCollection?.insertOne({
            name,
            email,
            image,
            provider: account ? account.provider : undefined,
            role: role || "admin",
          });
        } else {
          await userCollection?.updateOne(
            { email },
            { $set: { role: role || "admin" } }
          );
        }

        return true;
      } catch (error) {
        console.error("Error during signIn:", error);
        return false;
      }
    },

    async session({ session, user }) {
      session.user.role = user?.role || "admin";
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
