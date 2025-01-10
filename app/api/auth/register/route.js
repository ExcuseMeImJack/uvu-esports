import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, name, password } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email
    },
  });

  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword: await hash(password, 10),
        isAdmin,
        profilePic: "https://d3ki9tyy5l5ruj.cloudfront.net/obj/3d4665c7cf119dc9dc38232301b18fa68b9bb17c/avatar.svg"
      },
    });
    return NextResponse.json(user);
  }
}
