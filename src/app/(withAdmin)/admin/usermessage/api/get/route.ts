/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { connectDB } from "@/lib/connectDB";
import { Collection, Document } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }

    const contactsCollection: Collection<Document> = db.collection("contacts");
    const contacts = await contactsCollection.find().toArray();

    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred", error: (error as Error).message },
      { status: 500 }
    );
  }
};
