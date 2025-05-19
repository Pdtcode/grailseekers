import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { getAdminAuth } from '@/lib/firebaseAdmin';

// Add createdAt field for sorting
import { Prisma } from '@/lib/generated/prisma';

// GET all addresses for the current user
export async function GET(request: NextRequest) {
  try {
    // Get the authorization token from the header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split('Bearer ')[1];
    
    // Verify the Firebase token
    const decodedToken = await getAdminAuth().verifyIdToken(token);
    const { uid } = decodedToken;
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: uid
      }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Get user's addresses with sorting by default first, then by creation date
    try {
      const addresses = await prisma.address.findMany({
        where: {
          userId: user.id
        },
        orderBy: [
          { isDefault: 'desc' },
          { createdAt: 'desc' }
        ]
      });
      
      return NextResponse.json(addresses, { status: 200 });
    } catch (err: any) {
      console.error('Database query error:', err);
      
      // If the error is related to the createdAt field (might be caused by missing migration)
      if (err.message && (err.message.includes('createdAt') || err.message.includes('created_at'))) {
        // Fallback query without createdAt ordering
        const fallbackAddresses = await prisma.address.findMany({
          where: {
            userId: user.id
          },
          orderBy: [
            { isDefault: 'desc' }
          ]
        });
        
        return NextResponse.json(fallbackAddresses, { status: 200 });
      }
      
      // If it's another type of error, rethrow
      throw err;
    }
    
  } catch (error: any) {
    console.error('Error fetching addresses:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      message: error.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

// POST to create a new address
export async function POST(request: NextRequest) {
  try {
    // Get the authorization token from the header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split('Bearer ')[1];
    
    // Verify the Firebase token
    const decodedToken = await getAdminAuth().verifyIdToken(token);
    const { uid } = decodedToken;
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: uid
      }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Get address data from request body
    const data = await request.json();
    
    const { street, city, state, postalCode, country, isDefault } = data;
    
    // Validate required fields
    if (!street || !city || !state || !postalCode || !country) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    
    // If this address is default, update other addresses to not be default
    if (isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: user.id,
          isDefault: true
        },
        data: {
          isDefault: false
        }
      });
    }
    
    // Create the new address
    const address = await prisma.address.create({
      data: {
        userId: user.id,
        street,
        city, 
        state,
        postalCode,
        country,
        isDefault: !!isDefault
      }
    });
    
    return NextResponse.json(address, { status: 201 });
    
  } catch (error) {
    console.error('Error creating address:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}