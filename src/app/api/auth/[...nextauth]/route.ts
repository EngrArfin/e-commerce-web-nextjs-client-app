import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
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

        // Connect to the database
        const db = await connectDB();
        if (!db) {
          throw new Error("Failed to connect to the database");
        }

        // Find the user by email
        const currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) {
          throw new Error("No user found with the provided email");
        }

        // Compare the provided password with the stored hashed password
        const passwordMatched = await bcrypt.compare(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          throw new Error("Incorrect password");
        }

        // Return the user data, including the _id from MongoDB
        return {
          id: currentUser._id.toString(),
          email: currentUser.email,
          name: currentUser.name,
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
    signIn: "/login", // Custom login page
  },
  callbacks: {
    async signIn({ user, account }) {
      const { name, email, image } = user;

      if (account?.provider === "github") {
        console.log("GitHub user data:", user);

        // If GitHub email is missing, handle it
        if (!email) {
          console.log("GitHub user has no email.");
          return false; // Or ask for an alternate identifier
        }
      }

      try {
        const db = await connectDB();
        const userCollection = db?.collection("users");

        // Find user by email
        const userExist = await userCollection?.findOne({ email });

        if (!userExist) {
          // Insert new user
          const res = await userCollection?.insertOne({
            name,
            email,
            image,
            provider: account.provider,
          });
          console.log("New user inserted:", res);
          return user;
        } else {
          console.log("User already exists:", userExist);
          return user;
        }
      } catch (error) {
        console.log("Error during signIn:", error);
        return false;
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
