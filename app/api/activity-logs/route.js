import { prisma } from "@/lib/prisma";
import { ok, handleApiError } from "@/lib/response";
import { requireUser } from "@/lib/rbac";

export async function GET(request) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(request.url);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));

    const logs = await prisma.activityLog.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return ok({ items: logs }, "Fetched activity logs.");
  } catch (err) {
    return handleApiError(err);
  }
}
