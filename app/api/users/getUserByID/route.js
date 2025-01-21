import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import isAdmin from '@/lib/routes/isAdmin';

export async function POST(req) {
  try {
    const { userID } = await req.json();

    if (!userID) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const authorized = await isAdmin();

    if (!authorized) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { id: userID },
      select: {
        id: true,
        name: true,
        email: true,
        profilePic: true,
        isAdmin: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error.message);
    return NextResponse.json(
      { error: 'Error fetching user by ID' },
      { status: 500 }
    );
  }
}
