import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import { NextResponse } from "next/server";


export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(json.stringify({ error: 'unauthorized' }), { status: 401 });
  }

  return NextResponse.json({ authenticated: !!session });
}
