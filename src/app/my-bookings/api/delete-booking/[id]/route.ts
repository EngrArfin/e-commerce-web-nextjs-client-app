import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

// Named export for DELETE request handler
export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  const { id } = params;

  try {
    const resp = await bookingsCollection.deleteOne({ _id: new ObjectId(id) });
    return new Response(
      JSON.stringify({
        message: "Booking deleted successfully",
        response: resp,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
