import prisma from '../../../lib/prisma.ts';
import { NextResponse } from 'next/server';
import isAdmin from '../../../lib/routes/isAdmin.js'; // Ensure isAdmin is correctly implemented

// Handler for GET requests
export async function GET(req) {
  try {
    // Call isAdmin and check if the user is authorized
    const authorized = await isAdmin(); // Pass the request to isAdmin
    if (!authorized) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      );
    }

    // Fetch users if the user is an admin
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profilePic: true,
        isAdmin: true,
      },
    });

    // Return a JSON response with the users list
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    // Return a JSON response with an error message
    return NextResponse.json(
      { error: 'Error fetching users from the database' },
      { status: 500 }
    );
  }
}
