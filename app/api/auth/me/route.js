import { requireUser, sanitizeUser } from "@/lib/rbac";
import { ok, handleApiError } from "@/lib/response";

export async function GET() {
  try {
    const user = await requireUser();
    return ok(sanitizeUser(user), "Fetched current user.");
  } catch (err) {
    return handleApiError(err);
  }
}
