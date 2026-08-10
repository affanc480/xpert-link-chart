import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators";
import { ok, handleApiError, ApiError } from "@/lib/response";
import { signToken } from "@/lib/jwt";
import { COOKIE_NAME, authCookieOptions } from "@/lib/cookies";
import { sanitizeUser } from "@/lib/rbac";
import { logActivity } from "@/lib/activity-log";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`login:${ip}`, { limit: 10, windowMs: 60_000 });
    if (!limited.allowed) throw new ApiError("Too many login attempts. Try again shortly.", 429);

    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new ApiError("Invalid email or password.", 401);

    if (user.status !== "ACTIVE") throw new ApiError("Your account is not active. Contact support.", 403);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ApiError("Invalid email or password.", 401);

    const token = signToken({ id: user.id, role: user.role });

    await logActivity({ userId: user.id, action: "LOGIN", module: "auth", description: "User logged in", ip });

    const response = ok(sanitizeUser(user), "Login successful.");
    response.cookies.set(COOKIE_NAME, token, authCookieOptions());
    return response;
  } catch (err) {
    return handleApiError(err);
  }
}
