import { getServerSession } from 'next-auth';
import prisma from '../prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function isAdmin() {
  try {
    const session = await getServerSession(authOptions);
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
