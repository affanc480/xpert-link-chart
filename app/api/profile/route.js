import { prisma } from "@/lib/prisma";
import { updateProfileSchema } from "@/lib/validators";
import { ok, handleApiError } from "@/lib/response";
import { requireUser, sanitizeUser } from "@/lib/rbac";
import { logActivity } from "@/lib/activity-log";

export async function GET() {
  try {
    const user = await requireUser();
    return ok(sanitizeUser(user), "Fetched profile.");
  } catch (err) {
    return handleApiError(err);
  }
}

// Accepts JSON body. `avatar` can be a base64 data-URL string (frontend
// already reads the file as a data URL) — stored directly on the user row.
export async function PATCH(request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const data = updateProfileSchema.parse(body);

    const updated = await prisma.user.update({ where: { id: user.id }, data });

    await logActivity({ userId: user.id, action: "UPDATE_PROFILE", module: "profile", description: "Profile updated" });

    return ok(sanitizeUser(updated), "Profile updated successfully.");
  } catch (err) {
    return handleApiError(err);
  }
}
