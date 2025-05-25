import { NextRequest, NextResponse } from "next/server";

import { getUserOrders } from "@/app/actions/orderActions";
import prisma from "@/lib/prismaClient";

export async function GET(request: NextRequest) {
  try {
    // Get the user email from the query parameter
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get ONLY this user's orders
    const orders = await getUserOrders(user.id);

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);

    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
