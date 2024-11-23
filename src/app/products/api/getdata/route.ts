import { connectDB } from "@/lib/connectDB";
import { Collection, Document, Db } from "mongodb";

export const GET = async () => {
  const db: Db | null = await connectDB();

  // Check if db is null
  if (!db) {
    return new Response(
      JSON.stringify({ message: "Database connection failed" }),
      {
        status: 500,
      }
    );
  }

  const productsCollection: Collection<Document> = db.collection("products");

  try {
    const products = await productsCollection.find().toArray();
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
