import { prisma } from "@/lib/prisma";
import { verifyOtpSchema } from "@/lib/validators";
import { ok, handleApiError, ApiError } from "@/lib/response";
import { isOtpExpired } from "@/lib/otp";
import { signToken } from "@/lib/jwt";
import { COOKIE_NAME, authCookieOptions } from "@/lib/cookies";
import { sanitizeUser } from "@/lib/rbac";
import { logActivity } from "@/lib/activity-log";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, otp, purpose } = verifyOtpSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new ApiError("Account not found.", 404);

    if (purpose === "reset") {
      if (!user.resetPasswordOTP || user.resetPasswordOTP !== otp) {
        throw new ApiError("Invalid OTP.", 400);
      }
      if (isOtpExpired(user.resetOTPExpiry)) throw new ApiError("OTP has expired.", 400);

      return ok({ email: user.email, purpose }, "OTP verified. You may now reset your password.");
    }

    // purpose === "verify"
    if (!user.verificationOTP || user.verificationOTP !== otp) {
      throw new ApiError("Invalid OTP.", 400);
    }
    if (isOtpExpired(user.otpExpiry)) throw new ApiError("OTP has expired.", 400);

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, verificationOTP: null, otpExpiry: null },
    });

    const token = signToken({ id: updated.id, role: updated.role });
    await logActivity({ userId: updated.id, action: "VERIFY_EMAIL", module: "auth", description: "Email verified" });

    const response = ok(sanitizeUser(updated), "Email verified successfully.");
    response.cookies.set(COOKIE_NAME, token, authCookieOptions());
    return response;
  } catch (err) {
    return handleApiError(err);
  }
}
