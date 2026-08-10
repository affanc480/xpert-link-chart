import { prisma } from "@/lib/prisma";
import { resendOtpSchema } from "@/lib/validators";
import { ok, handleApiError, ApiError } from "@/lib/response";
import { generateOTP, otpExpiryDate } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`resend-otp:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!limited.allowed) throw new ApiError("Too many requests. Try again shortly.", 429);

    const body = await request.json();
    const { email, purpose } = resendOtpSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new ApiError("Account not found.", 404);

    const otp = generateOTP();
    const expiry = otpExpiryDate(10);

    if (purpose === "reset") {
      await prisma.user.update({
        where: { id: user.id },
        data: { resetPasswordOTP: otp, resetOTPExpiry: expiry },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { verificationOTP: otp, otpExpiry: expiry },
      });
    }

    await sendOtpEmail(user.email, otp, purpose);

    return ok({ email: user.email }, "A new OTP has been sent to your email.");
  } catch (err) {
    return handleApiError(err);
  }
}
