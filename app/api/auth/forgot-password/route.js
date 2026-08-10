import { prisma } from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/validators";
import { ok, handleApiError } from "@/lib/response";
import { generateOTP, otpExpiryDate } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { ApiError } from "@/lib/response";

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`forgot:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!limited.allowed) throw new ApiError("Too many requests. Try again shortly.", 429);

    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });

    // Always respond the same way to avoid leaking which emails exist.
    if (user) {
      const otp = generateOTP();
      await prisma.user.update({
        where: { id: user.id },
        data: { resetPasswordOTP: otp, resetOTPExpiry: otpExpiryDate(10) },
      });
      await sendOtpEmail(user.email, otp, "reset");
    }

    return ok({ email }, "If an account exists for this email, a reset code has been sent.");
  } catch (err) {
    return handleApiError(err);
  }
}
