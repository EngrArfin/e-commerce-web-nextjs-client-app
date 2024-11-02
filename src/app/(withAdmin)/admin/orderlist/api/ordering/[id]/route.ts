import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

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

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  const { id } = params;

  try {
    const resp = await bookingsCollection.findOne({
      _id: new ObjectId(id),
    });
    return Response.json({
      meaasge: " booking found product",
      data: resp,
    });
  } catch (error) {
    return Response.json({ meaasge: " Somthing wrong" });
  }
};
