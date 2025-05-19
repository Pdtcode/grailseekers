import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { getAdminAuth } from '@/lib/firebaseAdmin';

// Helper to get user from token
async function getUserFromToken(request: NextRequest) {
  // Get the authorization token from the header
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
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
  
  return user;
}

// GET a specific address
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromToken(request);
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const addressId = params.id;
    
    // Get the address
    const address = await prisma.address.findUnique({
      where: {
        id: addressId
      }
    });
    
    if (!address) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }
    
    // Check if address belongs to user
    if (address.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    return NextResponse.json(address, { status: 200 });
    
  } catch (error: any) {
    console.error('Error fetching address:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      message: error.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

// PUT to update an address
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromToken(request);
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const addressId = params.id;
    
    // Get the address
    const existingAddress = await prisma.address.findUnique({
      where: {
        id: addressId
      }
    });
    
    if (!existingAddress) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }
    
    // Check if address belongs to user
    if (existingAddress.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    // Get address data from request body
    const data = await request.json();
    
    const { street, city, state, postalCode, country, isDefault } = data;
    
    // Validate required fields
    if (!street || !city || !state || !postalCode || !country) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    
    // If this address is becoming default, update other addresses to not be default
    if (isDefault && !existingAddress.isDefault) {
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
    
    // Update the address
    const updatedAddress = await prisma.address.update({
      where: {
        id: addressId
      },
      data: {
        street,
        city,
        state,
        postalCode,
        country,
        isDefault: !!isDefault
      }
    });
    
    return NextResponse.json(updatedAddress, { status: 200 });
    
  } catch (error) {
    console.error('Error updating address:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE an address
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromToken(request);
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const addressId = params.id;
    
    // Get the address
    const address = await prisma.address.findUnique({
      where: {
        id: addressId
      }
    });
    
    if (!address) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }
    
    // Check if address belongs to user
    if (address.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    // Delete the address
    await prisma.address.delete({
      where: {
        id: addressId
      }
    });
    
    // If the deleted address was default, set another address as default
    if (address.isDefault) {
      const nextAddress = await prisma.address.findFirst({
        where: {
          userId: user.id
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      if (nextAddress) {
        await prisma.address.update({
          where: {
            id: nextAddress.id
          },
          data: {
            isDefault: true
          }
        });
      }
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
    
  } catch (error) {
    console.error('Error deleting address:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}