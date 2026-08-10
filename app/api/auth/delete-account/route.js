import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ok, handleApiError, ApiError } from "@/lib/response";
import { requireUser } from "@/lib/rbac";
import { COOKIE_NAME, clearCookieOptions } from "@/lib/cookies";

const schema = z.object({ password: z.string().min(1, "Password is required") });

export async function DELETE(request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const { password } = schema.parse(body);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ApiError("Password is incorrect.", 401);

    await prisma.user.delete({ where: { id: user.id } });

    const response = ok({}, "Account deleted successfully.");
    response.cookies.set(COOKIE_NAME, "", clearCookieOptions());
    return response;
  } catch (err) {
    return handleApiError(err);
  }
}
