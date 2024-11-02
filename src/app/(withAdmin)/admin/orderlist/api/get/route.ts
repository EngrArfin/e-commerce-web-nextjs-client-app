import { connectDB } from "@/lib/connectDB";
import { Collection, Document } from "mongodb";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  const { id } = params;
  try {
    const resp = await bookingsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return Response.json({
      meaasge: " delete booking product",
      response: resp,
    });
  } catch (error) {
    return Response.json({ meaasge: " Somthing wrong" });
  }
};

export const PATCH = async (request, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");

  const updateDoc = await request.json();
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
    return Response.json({
      meaasge: " update booking product",
      response: resp,
    });
  } catch (error) {
    return Response.json({ meaasge: " Somthing wrong" });
  }
};

export const GET = async () => {
  const db = await connectDB();
  const bookingsCollection: Collection<Document> = db.collection("bookings");

  try {
    const bookings = await bookingsCollection.find().toArray();
    return new Response(JSON.stringify({ bookings }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error occurred" }), {
      status: 500,
    });
  }
};
