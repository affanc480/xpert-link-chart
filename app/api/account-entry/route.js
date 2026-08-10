import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { ok, handleApiError, ApiError } from "@/lib/response";
import { accountEntrySchema } from "@/lib/validators";
import { logActivity } from "@/lib/activity-log";

async function assertOwnedReferences(userId, data) {
  if (data.accountId) {
    const acc = await prisma.account.findFirst({ where: { id: data.accountId, userId } });
    if (!acc) throw new ApiError("Account not found.", 404);
  }
  if (data.generalAccountId) {
    const gen = await prisma.chartOfAccountGeneral.findFirst({ where: { id: data.generalAccountId, userId } });
    if (!gen) throw new ApiError("General account not found.", 404);
  }
}

export async function GET(request) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));

    const where = { userId: user.id };

    const [items, total] = await Promise.all([
      prisma.accountEntry.findMany({
        where,
        include: {
          account: { select: { id: true, accountName: true } },
          generalAccount: { select: { id: true, code: true, title: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.accountEntry.count({ where }),
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
    const data = accountEntrySchema.parse(body);

    await assertOwnedReferences(user.id, data);

    const created = await prisma.accountEntry.create({ data: { ...data, userId: user.id } });

    await logActivity({ userId: user.id, action: "CREATE", module: "account-entry", description: `Created entry ${created.id}` });

    return ok(created, "Created successfully", 201);
  } catch (err) {
    return handleApiError(err);
  }
}
