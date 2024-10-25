import { connectDB } from "@/lib/connectDB";
import { services } from "@/lib/service";
import { Collection, Document } from "mongodb"; // Import Collection and Document types

export const GET = async () => {
  const db = await connectDB();
  const servicesCollection: Collection<Document> = db.collection("services"); // Type 'servicesCollection'

  try {
    await servicesCollection.deleteMany(); // Clear previous entries
    const resp = await servicesCollection.insertMany(services); // Insert new services
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

/* import { connectDB } from "@/lib/connectDB"
import { services } from "@/lib/service"

export const GET = async () =>{
    const db = await connectDB()
    const servicesCollection.insertMany('services');
    try{
        await servicesCollection.deleteMany();
        const resp = await servicesCollection.insertMany(services);
        return Response.json({message: " Send Succesifully"})
    }catch(error){
        console.log(error)
    }
} */
