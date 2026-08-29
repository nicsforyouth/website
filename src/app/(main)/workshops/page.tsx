import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { members } from "@/lib/schema";
import { account as accountTable } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { getMemberWorkshops } from "@/lib/workshop";
import Link from "next/link";

export default async function WorkshopsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth");

  // resolve Better Auth user -> Discord id -> members row
  const [acc] = await db
    .select()
    .from(accountTable)
    .where(
      and(
        eq(accountTable.userId, session.user.id),
        eq(accountTable.providerId, "discord"),
      ),
    );

  const [member] = acc
    ? await db
        .select()
        .from(members)
        .where(eq(members.discordId, acc.accountId))
    : [];

  if (!member) redirect("/auth");

  const workshopList = await getMemberWorkshops(member.id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-white">
      <h1 className="mb-6 text-lg font-semibold">Your Workshops</h1>
      {workshopList.length === 0 ? (
        <p className="text-sm text-neutral-400">
          You're not enrolled in any workshops yet.
        </p>
      ) : (
        <div className="space-y-3">
          {workshopList.map((w) => (
            <Link
              key={w.workshopId}
              href={`/dashboard/${w.slug}`}
              className="block rounded-xl border border-neutral-800 bg-neutral-900 p-5 hover:border-neutral-600 transition"
            >
              <h2 className="font-medium">{w.title}</h2>
              {w.description && (
                <p className="mt-1 text-sm text-neutral-400">{w.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
