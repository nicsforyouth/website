import { and, eq, inArray } from "drizzle-orm";
import { db } from "../db";
import {
  certificates,
  enrollments,
  finalProjects,
  modules,
  stepProgress,
  steps,
  workshops,
} from "../schema";

export async function getMemberWorkshops(memberId: string) {
  const rows = await db
    .select({
      workshopId: workshops.id,
      slug: workshops.slug,
      title: workshops.title,
      description: workshops.description,
    })
    .from(enrollments)
    .innerJoin(workshops, eq(enrollments.workshopId, workshops.id))
    .where(eq(enrollments.memberId, memberId));

  return rows;
}

export async function getMemberDashboard(memberId: string, workshopId: number) {
  const allModules = await db
    .select()
    .from(modules)
    .where(eq(modules.workshopId, workshopId))
    .orderBy(modules.order);

  const moduleIds = allModules.map((m) => m.id);
  const allSteps = moduleIds.length
    ? await db
        .select()
        .from(steps)
        .where(inArray(steps.moduleId, moduleIds))
        .orderBy(steps.order)
    : [];

  const progress = await db
    .select()
    .from(stepProgress)
    .where(eq(stepProgress.memberId, memberId));
  const completedStepIds = new Set(
    progress.filter((p) => p.completed).map((p) => p.stepId),
  );

  const moduleData = allModules.map((mod) => {
    const modSteps = allSteps.filter((s) => s.moduleId === mod.id);
    const completedCount = modSteps.filter((s) =>
      completedStepIds.has(s.id),
    ).length;
    return {
      ...mod,
      steps: modSteps.map((s) => ({
        ...s,
        completed: completedStepIds.has(s.id),
      })),
      totalSteps: modSteps.length,
      completedSteps: completedCount,
      percent: modSteps.length
        ? Math.round((completedCount / modSteps.length) * 100)
        : 0,
    };
  });

  const totalSteps = allSteps.length;
  const totalCompleted = [...completedStepIds].filter((id) =>
    allSteps.some((s) => s.id === id),
  ).length;
  const overallPercent = totalSteps
    ? Math.round((totalCompleted / totalSteps) * 100)
    : 0;

  let nextStep = null;
  for (const mod of moduleData) {
    const incomplete = mod.steps.find((s) => !s.completed);
    if (incomplete) {
      nextStep = { ...incomplete, moduleTitle: mod.title };
      break;
    }
  }

  const [finalProject] = await db
    .select()
    .from(finalProjects)
    .where(
      and(
        eq(finalProjects.memberId, memberId),
        eq(finalProjects.workshopId, workshopId),
      ),
    );

  const [certificate] = await db
    .select()
    .from(certificates)
    .where(
      and(
        eq(certificates.memberId, memberId),
        eq(certificates.workshopId, workshopId),
      ),
    );

  return {
    modules: moduleData,
    overallPercent,
    nextStep,
    finalProject,
    certificate,
  };
}

export async function isMemberEnrolled(memberId: string, workshopId: number) {
  const [existing] = await db
    .select()
    .from(enrollments)
    .where(
      and(
        eq(enrollments.memberId, memberId),
        eq(enrollments.workshopId, workshopId),
      ),
    );
  return !!existing;
}
