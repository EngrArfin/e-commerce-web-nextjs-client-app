import { connectDB } from "@/lib/connectDB";
import { Collection, Document } from "mongodb"; // Import Collection and Document types

export const GET = async () => {
  const db = await connectDB();
  const productsCollection: Collection<Document> = db.collection("products"); // Type 'servicesCollection'

  try {
    const products = await productsCollection.find().toArray(); // Insert new services
    return new Response(JSON.stringify({ products }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error occurred" }), {
      status: 500,
    });
  }
};