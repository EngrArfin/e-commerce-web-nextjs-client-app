import { connectDB } from "@/lib/connectDB";
import { Collection, Document, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  id: string;
}

interface RouteContext {
  params: RouteParams;
}

// GET
export const GET = async (request: NextRequest, context: RouteContext) => {
  const db = await connectDB();

  if (!db) {
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }

  const bookingsCollection: Collection<Document> = db.collection("bookings");
  const { id } = context.params;

  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const booking = await bookingsCollection.findOne({ _id: new ObjectId(id) });

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: (error as Error).message },
      { status: 500 }
    );
  }
};

// DELETE
export const DELETE = async (request: NextRequest, context: RouteContext) => {
  const db = await connectDB();
  if (!db) {
    return new NextResponse(
      JSON.stringify({ message: "Database connection failed" }),
      { status: 500 }
    );
  }

  const bookingsCollection = db.collection("bookings");
  const { id } = context.params;

  try {
    if (!ObjectId.isValid(id)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid ID format" }),
        { status: 400 }
      );
    }

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
    console.error("Error deleting booking:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
      }
    );
  }
};

// PATCH
export const PATCH = async (request: NextRequest, context: RouteContext) => {
  const db = await connectDB();
  if (!db) {
    return new NextResponse(
      JSON.stringify({ message: "Database connection failed" }),
      { status: 500 }
    );
  }

  const bookingsCollection = db.collection("bookings");
  const { id } = context.params;
  const updateDoc = await request.json();

  try {
    if (!ObjectId.isValid(id)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid ID format" }),
        { status: 400 }
      );
    }

    const resp = await bookingsCollection.updateOne(
      { _id: new ObjectId(id) },
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
    console.error("Error updating booking:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
      }
    );
  }
};
