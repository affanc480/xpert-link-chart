import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { changePasswordSchema } from "@/lib/validators";
import { ok, handleApiError, ApiError } from "@/lib/response";
import { requireUser } from "@/lib/rbac";
import { sendPasswordChangedEmail } from "@/lib/email";
import { logActivity } from "@/lib/activity-log";

export async function PATCH(request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const { currentPassword, newPassword } = changePasswordSchema.parse(body);

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) throw new ApiError("Current password is incorrect.", 401);

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: user.id }, data: { password: hashedPassword } });

    await sendPasswordChangedEmail(user.email);
    await logActivity({ userId: user.id, action: "CHANGE_PASSWORD", module: "auth", description: "Password changed" });

    return ok({}, "Password changed successfully.");
  } catch (err) {
    return handleApiError(err);
  }
}
