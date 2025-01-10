import NextAuth from "next-auth";
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

        console.log(credentials, user)
        const isPasswordValid = await compare(credentials.password, user.hashedPassword);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Return user data for token creation
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          profilePic: user.profilePic,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        // Add custom user data to session
        console.log("SESSION =>", session)
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          profilePic: token.profilePic,
          isAdmin: token.isAdmin,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // Add custom user data to the JWT
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.profilePic = user.profilePic;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
