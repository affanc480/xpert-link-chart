import { prisma } from "@/lib/prisma";
import { ok, handleApiError } from "@/lib/response";
import { requireUser } from "@/lib/rbac";

export async function GET() {
  try {
    const user = await requireUser();

    const startOfThisMonth = new Date();
    startOfThisMonth.setDate(1);
    startOfThisMonth.setHours(0, 0, 0, 0);

    const startOfLastMonth = new Date(startOfThisMonth);
    startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);

    const [
      inventoryCount,
      reportsCount,
      accountsCount,
      recentActivity,
      inventoryThisMonth,
      inventoryLastMonth,
    ] = await Promise.all([
      prisma.inventory.count({ where: { userId: user.id } }),
      prisma.report.count({ where: { userId: user.id } }),
      prisma.account.count({ where: { userId: user.id } }),
      prisma.activityLog.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.inventory.count({ where: { userId: user.id, createdAt: { gte: startOfThisMonth } } }),
      prisma.inventory.count({
        where: { userId: user.id, createdAt: { gte: startOfLastMonth, lt: startOfThisMonth } },
      }),
    ]);

    const monthlyGrowth =
      inventoryLastMonth === 0
        ? inventoryThisMonth > 0
          ? 100
          : 0
        : Math.round(((inventoryThisMonth - inventoryLastMonth) / inventoryLastMonth) * 100);

    return ok(
      {
        inventoryCount,
        reportsCount,
        accountsCount,
        recentActivity,
        monthlyGrowth,
      },
      "Dashboard stats fetched."
    );
  } catch (err) {
    return handleApiError(err);
  }
}
