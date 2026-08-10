import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/response";

/**
 * Reads the JWT from the httpOnly cookie, verifies it, and loads the
 * current user from the database. Throws ApiError(401) if not authenticated.
 * Pass { roles: ["ADMIN"] } to additionally enforce role-based access.
 */
export async function requireUser(options = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new ApiError("Not authenticated.", 401);

  const decoded = verifyToken(token);
  if (!decoded?.id) throw new ApiError("Invalid or expired session.", 401);

  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  if (!user) throw new ApiError("User not found.", 401);
  if (user.status !== "ACTIVE") throw new ApiError("Account is not active.", 403);

  if (options.roles && !options.roles.includes(user.role)) {
    throw new ApiError("You do not have permission to perform this action.", 403);
  }

  return user;
}

export function sanitizeUser(user) {
  if (!user) return null;
  const {
    password,
    verificationOTP,
    otpExpiry,
    resetPasswordOTP,
    resetOTPExpiry,
    ...safe
  } = user;
  return safe;
}
