import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { client } from '@/sanity/lib/client';

// Query to get the drop password from Sanity
const getDropPasswordQuery = `*[_type == "dropPassword"][0].password`;

export async function GET(request: NextRequest) {
  try {
    // Get the auth cookie - await the cookies() call
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get('drop-auth')?.value;
    
    // Get the correct password from Sanity
    const correctPassword = await client.fetch(getDropPasswordQuery);
    
    if (cookieValue === correctPassword) {
      return NextResponse.json(
        { authenticated: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error in check-drop-auth API:', error);
    return NextResponse.json(
      { authenticated: false, message: 'Server error' },
      { status: 500 }
    );
  }
}