import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { ok, handleApiError, ApiError } from "@/lib/response";
import { chartGeneralSchema } from "@/lib/validators";
import { logActivity } from "@/lib/activity-log";

export async function GET(request) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const q = searchParams.get("q")?.trim();

    const where = { userId: user.id };
    if (q) {
      where.OR = [
        { code: { contains: q, mode: "insensitive" } },
        { title: { contains: q, mode: "insensitive" } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.chartOfAccountGeneral.findMany({
        where,
        include: { mainAccount: { select: { id: true, code: true, title: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.chartOfAccountGeneral.count({ where }),
    ]);

    return ok({ items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } }, "Fetched successfully");
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const data = chartGeneralSchema.parse(body);

    // IDOR protection: the referenced main account must belong to this user.
    const mainAccount = await prisma.chartOfAccountMain.findFirst({
      where: { id: data.mainAccountId, userId: user.id },
    });
    if (!mainAccount) throw new ApiError("Main account not found.", 404);

    const created = await prisma.chartOfAccountGeneral.create({
      data: { ...data, userId: user.id },
      include: { mainAccount: { select: { id: true, code: true, title: true } } },
    });

    await logActivity({
      userId: user.id,
      action: "CREATE",
      module: "chart-of-account-general",
      description: `Created general account ${created.id}`,
    });

    return ok(created, "Created successfully", 201);
  } catch (err) {
    return handleApiError(err);
  }
}
