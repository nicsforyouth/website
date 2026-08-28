import { db } from "@/lib/db";
import { members } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.BOT_API_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { discordId, username, avatarUrl } = await req.json();

  await db
    .insert(members)
    .values({ discordId, username, avatarUrl, registeredVia: "bot" })
    .onConflictDoNothing({ target: members.discordId });

  return NextResponse.json({ ok: true });
}
