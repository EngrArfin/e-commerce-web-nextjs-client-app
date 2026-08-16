import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const formData = Object.fromEntries(body.entries());

    const id = formData.id as string;
    const name = formData.name as string;
    const description = formData.description as string;
    const price = formData.price as string;
    const ratings = formData.ratings as string;
    const category = formData.category as string;

    if (!id || !name || !description || !price || !ratings || !category) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const parsedPrice = parseFloat(price);
    const parsedRatings = parseFloat(ratings);

    if (isNaN(parsedPrice) || isNaN(parsedRatings)) {
      return NextResponse.json(
        { error: "Price and ratings must be valid numbers." },
        { status: 400 }
      );
    }

    const image = body.get("image");
    if (!image || !(image instanceof File)) {
      return NextResponse.json(
        { error: "An image file is required and must be valid." },
        { status: 400 }
      );
    }

    const imageFile = {
      name: image.name,
      size: image.size,
      type: image.type,
    };

    const db = await connectDB();
    const productsCollection = db.collection("services");

    const result = await productsCollection.insertOne({
      id,
      name,
      description,
      price: parsedPrice,
      ratings: parsedRatings,
      category,
      image: imageFile,
      createdAt: new Date(),
    });

    if (result.acknowledged) {
      return NextResponse.json(
        { message: "Your product has been added successfully!" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to add the product" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing product form:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
