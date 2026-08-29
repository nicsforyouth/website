import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { members } from "@/lib/schema";
import { account as accountTable } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

/**
 * Resolves the current Better Auth session into the corresponding
 * `members` row, going through the `account` table to get the real
 * Discord snowflake (session.user.id is Better Auth's internal id,
 * not the Discord id).
 *
 * Returns null if there's no session, no linked Discord account,
 * or no matching members row (e.g. they haven't completed registration).
 */
export async function getMemberFromSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const [acc] = await db
    .select()
    .from(accountTable)
    .where(
      and(
        eq(accountTable.userId, session.user.id),
        eq(accountTable.providerId, "discord"),
      ),
    );
  if (!acc) return null;

  const [member] = await db
    .select()
    .from(members)
    .where(eq(members.discordId, acc.accountId));
  return member ?? null;
}
