import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions = {
  session: {
    strategy: "jwt", // Use JWT sessions for stateless authentication
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "hello@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Return user data for token creation
        return {
          id: user.id.toString(),
          email: user.email,
          username: user.username,
          profilePicUrl: user.profile_pic_url,
          isPrivate: user.is_private,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        // Include custom fields in the session object
        session.user = {
          ...session.user,
          id: token.id,
          username: token.username,
          profilePicUrl: token.profilePicUrl,
          isPrivate: token.isPrivate,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // Add user data to the JWT
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.profilePicUrl = user.profilePicUrl;
        token.isPrivate = user.isPrivate;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin", // Customize sign-in page
    error: "/auth/error",   // Error page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
