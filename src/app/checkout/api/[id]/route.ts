/* eslint-disable @typescript-eslint/no-unused-vars */

import { connectDB } from "@/lib/connectDB";
import { Collection } from "mongodb";

export const POST = async (request) => {
  const booking = await request.json();
  const db = await connectDB();
  const bookingCollection: Collection<Document> = db.collection("booking");

  try {
    const newBooking = await bookingCollection.insertOne(booking);
    return new Response(JSON.stringify({ message: "Sent Successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error occurred" }), {
      status: 500,
    });
  }
};
