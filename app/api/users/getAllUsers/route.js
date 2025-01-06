export const dynamic = 'force-static'

import { neon } from '@neondatabase/serverless';

export async function GET(req) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()

  return Response.json({ data })
}
