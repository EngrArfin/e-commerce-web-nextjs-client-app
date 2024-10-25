import { connectDB } from "@/lib/connectDB";
import { Collection, Document, ObjectId } from "mongodb"; // Import ObjectId
import { NextRequest, NextResponse } from "next/server"; // Import types for Next.js API routes

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const db = await connectDB();
  if (!db) {
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }

  const servicesCollection: Collection<Document> = db.collection("services");

  try {
    const service = await servicesCollection.findOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json({ service });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    );
  }
};
