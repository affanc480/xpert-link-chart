import { ok, handleApiError } from "@/lib/response";
import { COOKIE_NAME, clearCookieOptions } from "@/lib/cookies";
import { requireUser } from "@/lib/rbac";
import { logActivity } from "@/lib/activity-log";

export async function POST() {
  try {
    try {
      const user = await requireUser();
      await logActivity({ userId: user.id, action: "LOGOUT", module: "auth", description: "User logged out" });
    } catch {
      // already logged out / invalid token — still clear cookie below
    }

    const response = ok({}, "Logged out successfully.");
    response.cookies.set(COOKIE_NAME, "", clearCookieOptions());
    return response;
  } catch (err) {
    return handleApiError(err);
  }
}
