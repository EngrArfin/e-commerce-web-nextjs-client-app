import { connectDB } from "@/lib/connectDB";
import { Collection, Document, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  // Establish database connection
  const db = await connectDB();
  if (!db) {
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }

  // Access the bookings collection
  const bookingsCollection: Collection<Document> = db.collection("bookings");
  const { id } = params;

  // Check if the provided ID is a valid ObjectId
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  try {
    // Find the booking in the collection
    const booking = await bookingsCollection.findOne({ _id: new ObjectId(id) });

    // Return 404 response if no booking is found
    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    // Return the booking details
    return NextResponse.json({ booking });
  } catch (error) {
    // Handle unexpected errors gracefully
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: (error as Error).message },
      { status: 500 }
    );
  }
};
