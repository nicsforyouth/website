"use server";

import { db } from "@/lib/db";
import { enrollments, workshops } from "@/lib/schema";
import { getMemberFromSession } from "@/lib/get-member-from-session";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function enrollInWorkshop(workshopSlug: string) {
  const member = await getMemberFromSession();
  if (!member) throw new Error("Not signed in");

  const [workshop] = await db
    .select()
    .from(workshops)
    .where(eq(workshops.slug, workshopSlug));
  if (!workshop) throw new Error("Workshop not found");

  const [existing] = await db
    .select()
    .from(enrollments)
    .where(
      and(
        eq(enrollments.memberId, member.id),
        eq(enrollments.workshopId, workshop.id),
      ),
    );

  if (!existing) {
    await db
      .insert(enrollments)
      .values({ memberId: member.id, workshopId: workshop.id });
  }

  revalidatePath(`/workshops/${workshopSlug}`);
}
