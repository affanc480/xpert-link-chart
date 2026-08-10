import { prisma } from "@/lib/prisma";
import { setupSchema } from "@/lib/validators";
import { ok, handleApiError } from "@/lib/response";
import { requireUser } from "@/lib/rbac";
import { logActivity } from "@/lib/activity-log";

export async function GET() {
  try {
    const user = await requireUser();
    const setup = await prisma.setup.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });
    return ok(setup, "Fetched setup.");
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const data = setupSchema.parse(body);

    const setup = await prisma.setup.upsert({
      where: { userId: user.id },
      update: data,
      create: { userId: user.id, ...data },
    });

    await logActivity({ userId: user.id, action: "UPDATE", module: "setup", description: "Setup updated" });

    return ok(setup, "Setup saved successfully.");
  } catch (err) {
    return handleApiError(err);
  }
}
