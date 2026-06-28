/**
 * Plan limits — single source of truth for what each plan can do.
 * Reference this everywhere: billing gates, UI upgrade prompts, API validation.
 */
export const PLAN_LIMITS = {
  FREE: {
    maxWorkflows:     3,
    runsPerMonth:   100,
    label:          "Free",
    price:            0,
  },
  PRO: {
    maxWorkflows:   -1,   // unlimited
    runsPerMonth: 10_000,
    label:         "Pro",
    price:           19,
  },
  TEAM: {
    maxWorkflows:   -1,
    runsPerMonth: 50_000,
    label:         "Team",
    price:           49,
  },
} as const;

export type PlanKey = keyof typeof PLAN_LIMITS;

export function canCreateWorkflow(plan: PlanKey, currentCount: number): boolean {
  const limit = PLAN_LIMITS[plan].maxWorkflows;
  return limit === -1 || currentCount < limit;
}

export function canRun(plan: PlanKey, runsThisMonth: number): boolean {
  return runsThisMonth < PLAN_LIMITS[plan].runsPerMonth;
}

export function getRunsRemaining(plan: PlanKey, runsThisMonth: number): number {
  return Math.max(0, PLAN_LIMITS[plan].runsPerMonth - runsThisMonth);
}
