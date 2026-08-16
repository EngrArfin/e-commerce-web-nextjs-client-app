/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request: Request) => {
  const newUser = await request.json();

  try {
    const db = await connectDB();

    if (!db) {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }

    const userCollection = db.collection("users");

    const exist = await userCollection.findOne({ email: newUser.email });

    if (exist) {
      return NextResponse.json({ message: "User Exists" }, { status: 304 });
    }
    const hashedPassword = bcrypt.hashSync(newUser.password, 14);
    const userToInsert = {
      ...newUser,
      password: hashedPassword,
      role: newUser.role || "admin",
    };

    const resp = await userCollection.insertOne(userToInsert);

    const path = newUser.role === "admin" ? "/admin" : "/user";

    return NextResponse.json(
      { message: "User Created", data: resp, redirectTo: path },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something Went Wrong", error },
      { status: 500 }
    );
  }
};
