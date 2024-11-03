/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { connectDB } from "@/lib/connectDB";
import { Collection, Document, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// GET handler
export const GET = async (request: NextRequest) => {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }

    const bookingsCollection: Collection<Document> = db.collection("bookings");
    const bookings = await bookingsCollection.find().toArray();

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred", error: (error as Error).message },
      { status: 500 }
    );
  }
};

// DELETE handler
export const DELETE = async (request: NextRequest, { params }: any) => {
  const db = await connectDB();
  if (!db) {
    return new NextResponse(
      JSON.stringify({ message: "Database connection failed" }),
      { status: 500 }
    );
  }

  const bookingsCollection = db.collection("bookings");
  const { id } = params;

  try {
    const resp = await bookingsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return new NextResponse(
      JSON.stringify({
        message: "Deleted booking product",
        response: resp,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
      }
    );
  }
};

// PATCH handler
export const PATCH = async (request: NextRequest, { params }: any) => {
  const db = await connectDB();
  if (!db) {
    return new Response(
      JSON.stringify({ message: "Database connection failed" }),
      { status: 500 }
    );
  }

  const bookingsCollection = db.collection("bookings");
  const updateDoc = await request.json(); // This is valid with NextRequest

  try {
    const resp = await bookingsCollection.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...updateDoc,
        },
      },
      {
        upsert: true,
      }
    );
    return new NextResponse(
      JSON.stringify({
        message: "Updated booking product",
        response: resp,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
      }
    );
  }
};
