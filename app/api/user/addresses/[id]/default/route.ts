import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismaClient";
import { getAdminAuth } from "@/lib/firebaseAdmin";

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    const addressId = parts[5]; // Adjust index based on your route structure

    // Get the authorization token from the header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];

    // Verify the Firebase token
    const decodedToken = await getAdminAuth().verifyIdToken(token);
    const { uid } = decodedToken;

    // Get user from database
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: uid,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the address
    const address = await prisma.address.findUnique({
      where: {
        id: addressId,
      },
    });

    if (!address) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    // Check if address belongs to user
    if (address.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // If already default, nothing to do
    if (address.isDefault) {
      return NextResponse.json(address, { status: 200 });
    }

    // Update all user's addresses to not be default
    await prisma.address.updateMany({
      where: {
        userId: user.id,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });

    // Set this address as default
    const updatedAddress = await prisma.address.update({
      where: {
        id: addressId,
      },
      data: {
        isDefault: true,
      },
    });

    return NextResponse.json(updatedAddress, { status: 200 });
  } catch (error) {
    console.error("Error setting default address:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
