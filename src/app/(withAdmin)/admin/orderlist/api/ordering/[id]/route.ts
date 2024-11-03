import { connectDB } from "@/lib/connectDB";
import { Collection, Document, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Define the expected parameters for the route
interface RouteParams {
  id: string; // Ensure this matches the route [id]
}

// Define the context interface expected by Next.js
interface RouteContext {
  params: RouteParams;
}

export const GET = async (
  request: NextRequest,
  context: RouteContext // Use the defined context type
) => {
  const db = await connectDB();

  if (!db) {
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }

  const bookingsCollection: Collection<Document> = db.collection("bookings");
  const { id } = context.params; // Extracting the id from params

  try {
    // Ensure the id is a valid ObjectId
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
