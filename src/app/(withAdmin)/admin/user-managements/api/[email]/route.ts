import { connectDB } from "@/lib/connectDB";
import { Collection, Document } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { email: string } }
) => {
  const db = await connectDB();
  if (!db) {
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }

  const userCollection: Collection<Document> = db.collection("users");

  try {
    const allUsers = await userCollection.find({ id: params._id }).toArray();
    return NextResponse.json({ allUsers });
  } catch (error) {
    console.error("Error fetching email:", error);
    return NextResponse.json(
      { error: "Failed to fetch email" },
      { status: 500 }
    );
  }
};
