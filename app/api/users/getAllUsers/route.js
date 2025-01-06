import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'; // Import NextResponse

const prisma = new PrismaClient();

// Handler for GET requests
export async function GET() {
  try {
    const users = await prisma.user.findMany({ // Excludes the hashedpassword for safety reasons
      select: {
        id: true,
        name: true,
        email: true,
        profilePic: true,
        isAdmin: true
      }
    });
    // Return a JSON response with the users list
    return NextResponse.json(users);

  } catch (error) {
    console.error(error);
    // Return a JSON response with an error message
    return NextResponse.json({ error: 'Error fetching users from the database' }, { status: 500 });

  } finally {
    await prisma.$disconnect();
  }
}
