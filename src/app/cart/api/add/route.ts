import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { userId, productId, quantity } = await req.json();

    // Make the call to your database or backend API
    const res = await axios.post(`${process.env.BASE_URL}/cart/api/add`, {
      userId,
      productId,
      quantity,
    });

    if (res.status !== 200) {
      return NextResponse.json(
        { message: `Failed to add product to cart: ${res.statusText}` },
        { status: 400 }
      );
    }

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json(
      { message: "Failed to add product to cart" },
      { status: 500 }
    );
  }
}
