import { connectDB } from "@/lib/connectDB";
import { Collection, Document } from "mongodb";

export const GET = async () => {
  const db = await connectDB();
  const servicesCollection: Collection<Document> = db.collection("services");

  try {
    const services = await servicesCollection.find().toArray();
    return new Response(JSON.stringify({ services }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error occurred" }), {
      status: 500,
    });
  }
};
