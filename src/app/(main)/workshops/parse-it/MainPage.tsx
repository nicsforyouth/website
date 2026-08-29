import { getMemberFromSession } from "@/lib/get-member-from-session";
import { db } from "@/lib/db";
import { workshops, modules, steps, enrollments } from "@/lib/schema";
import { eq, inArray } from "drizzle-orm";
import { enrollInWorkshop } from "@/app/actions/enroll";
import { ContinueWithDiscord } from "@/components/auth/ContinueWithDiscord";
import { notFound } from "next/navigation";
import { isMemberEnrolled } from "@/lib/workshop";

const WORKSHOP_SLUG = "parse-it";

export async function ParseItWorkshopPage() {
  const [workshop] = await db
    .select()
    .from(workshops)
    .where(eq(workshops.slug, WORKSHOP_SLUG));
  if (!workshop) notFound();

  const member = await getMemberFromSession();

  const isEnrolled = member
    ? await isMemberEnrolled(member.id, workshop.id)
    : false;

  const allModules = await db
    .select()
    .from(modules)
    .where(eq(modules.workshopId, workshop.id))
    .orderBy(modules.order);

  const moduleIds = allModules.map((m) => m.id);
  const allSteps = moduleIds.length
    ? await db
        .select()
        .from(steps)
        .where(inArray(steps.moduleId, moduleIds))
        .orderBy(steps.order)
    : [];

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold">{workshop.title}</h1>
      {workshop.description && (
        <p className="mt-2 text-neutral-400">{workshop.description}</p>
      )}

      {/* Not signed in */}
      {!member && (
        <div className="mt-6 rounded-xl border flex flex-col items-center justify-center border-neutral-800 p-6 text-center">
          <p className="mb-4 text-sm">Sign in with Discord to enroll.</p>
          <ContinueWithDiscord callbackURL="/workshops/parse-it" />
        </div>
      )}

      {/* Signed in, not enrolled */}
      {member && !isEnrolled && (
        <form
          action={enrollInWorkshop.bind(null, WORKSHOP_SLUG)}
          className="mt-6"
        >
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-500 transition"
          >
            Enroll in this workshop
          </button>
        </form>
      )}

      {/* Enrolled — show modules */}
      {member && isEnrolled && (
        <div className="mt-8 space-y-4">
          {allModules.map((mod) => {
            const modSteps = allSteps.filter((s) => s.moduleId === mod.id);
            return (
              <div
                key={mod.id}
                className="rounded-xl border border-neutral-800 bg-neutral-900 p-5"
              >
                <h2 className="font-medium">{mod.title}</h2>
                <ul className="mt-3 space-y-2">
                  {modSteps.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-neutral-300">{s.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500">
                          {s.type}
                        </span>
                        {s.url && (
                          <a
                            href={s.url}
                            target="_blank"
                            className="text-indigo-400 underline hover:text-indigo-300"
                          >
                            Open →
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
