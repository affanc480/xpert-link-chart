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

export async function GET(_request, { params }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const item = await prisma.accountEntry.findFirst({ where: { id, userId: user.id } });
    if (!item) throw new ApiError("Record not found.", 404);
    return ok(item, "Fetched successfully");
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(request, { params }) {
  try {
    const user = await requireUser();
    const { id } = await params;

    const existing = await prisma.accountEntry.findFirst({ where: { id, userId: user.id } });
    if (!existing) throw new ApiError("Record not found.", 404);

    const body = await request.json();
    const data = accountEntrySchema.partial().parse(body);

    await assertOwnedReferences(user.id, data);

    const updated = await prisma.accountEntry.update({ where: { id }, data });

    await logActivity({ userId: user.id, action: "UPDATE", module: "account-entry", description: `Updated ${id}` });

    return ok(updated, "Updated successfully");
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(_request, { params }) {
  try {
    const user = await requireUser();
    const { id } = await params;

    const existing = await prisma.accountEntry.findFirst({ where: { id, userId: user.id } });
    if (!existing) throw new ApiError("Record not found.", 404);

    await prisma.accountEntry.delete({ where: { id } });

    await logActivity({ userId: user.id, action: "DELETE", module: "account-entry", description: `Deleted ${id}` });

    return ok({ id }, "Deleted successfully");
  } catch (err) {
    return handleApiError(err);
  }
}
