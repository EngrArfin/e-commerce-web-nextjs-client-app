import { connectDB } from "@/lib/connectDB";
import { Collection, Document } from "mongodb"; // Import Collection and Document types

export const GET = async () => {
  const db = await connectDB();
  const servicesCollection: Collection<Document> = db.collection("services"); // Type 'servicesCollection'

  try {
    const services = await servicesCollection.find().toArray(); // Insert new services
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
