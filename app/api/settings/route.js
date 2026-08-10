import { prisma } from "@/lib/prisma";
import { settingsSchema } from "@/lib/validators";
import { ok, handleApiError } from "@/lib/response";
import { requireUser } from "@/lib/rbac";
import { logActivity } from "@/lib/activity-log";

export async function GET() {
  try {
    const user = await requireUser();
    const settings = await prisma.settings.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });
    return ok(settings, "Fetched settings.");
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const data = settingsSchema.parse(body);

    const settings = await prisma.settings.upsert({
      where: { userId: user.id },
      update: data,
      create: { userId: user.id, ...data },
    });

    await logActivity({ userId: user.id, action: "UPDATE", module: "settings", description: "Settings updated" });

    return ok(settings, "Settings saved successfully.");
  } catch (err) {
    return handleApiError(err);
  }
}
