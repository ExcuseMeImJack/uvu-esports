import prisma from '../prisma';
import { getSession } from 'next-auth/react';

export default async function isAdmin(req) {
  try {
    const session = await getSession({ req });

    if (!session || !session.user) {
      return false;
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { isAdmin: true },
    });

    return user?.isAdmin === true;
  } catch (error) {
    console.error('Error in isAdmin:', error);
    return false; // Default to not authorized on error
  }
}
