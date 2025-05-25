import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { client } from "@/sanity/lib/client";

// Query to get the drop password from Sanity
const getDropPasswordQuery = `*[_type == "dropPassword"][0].password`;

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Get the correct password from Sanity
    const correctPassword = await client.fetch(getDropPasswordQuery);

    if (password === correctPassword) {
      // Create a response
      const response = NextResponse.json({ success: true }, { status: 200 });

      // Set the cookie on the response - await the cookies() call
      const cookieStore = await cookies();

      cookieStore.set("drop-auth", password, {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "lax",
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: "Incorrect password" },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("Error in drop API:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
