import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, phone } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    const db = await connectDB();
    const contactsCollection = db.collection("messages"); // Use your preferred collection name

    // Insert the contact form data into MongoDB
    const result = await contactsCollection.insertOne({
      name,
      email,
      message,
      phone,
      createdAt: new Date(),
    });

    if (result.acknowledged) {
      return NextResponse.json(
        { message: "Your message has been sent successfully!" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to send your message" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
