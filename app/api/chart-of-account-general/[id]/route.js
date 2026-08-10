import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/rbac";
import { ok, handleApiError, ApiError } from "@/lib/response";
import { chartGeneralSchema } from "@/lib/validators";
import { logActivity } from "@/lib/activity-log";

export async function GET(_request, { params }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const item = await prisma.chartOfAccountGeneral.findFirst({
      where: { id, userId: user.id },
      include: { mainAccount: { select: { id: true, code: true, title: true } } },
    });
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

    const existing = await prisma.chartOfAccountGeneral.findFirst({ where: { id, userId: user.id } });
    if (!existing) throw new ApiError("Record not found.", 404);

    const body = await request.json();
    const data = chartGeneralSchema.partial().parse(body);

    // The code is permanent once a row is created — edits can never change it.
    delete data.code;

    if (data.mainAccountId) {
      const mainAccount = await prisma.chartOfAccountMain.findFirst({
        where: { id: data.mainAccountId, userId: user.id },
      });
      if (!mainAccount) throw new ApiError("Main account not found.", 404);
    }

    const updated = await prisma.chartOfAccountGeneral.update({
      where: { id },
      data,
      include: { mainAccount: { select: { id: true, code: true, title: true } } },
    });

    await logActivity({ userId: user.id, action: "UPDATE", module: "chart-of-account-general", description: `Updated ${id}` });

    return ok(updated, "Updated successfully");
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(_request, { params }) {
  try {
    const user = await requireUser();
    const { id } = await params;

    const existing = await prisma.chartOfAccountGeneral.findFirst({ where: { id, userId: user.id } });
    if (!existing) throw new ApiError("Record not found.", 404);

    await prisma.chartOfAccountGeneral.delete({ where: { id } });

    await logActivity({ userId: user.id, action: "DELETE", module: "chart-of-account-general", description: `Deleted ${id}` });

    return ok({ id }, "Deleted successfully");
  } catch (err) {
    return handleApiError(err);
  }
}
