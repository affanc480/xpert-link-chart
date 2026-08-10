import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/validators";
import { ok, handleApiError, ApiError } from "@/lib/response";
import { isOtpExpired } from "@/lib/otp";
import { sendPasswordChangedEmail } from "@/lib/email";
import { logActivity } from "@/lib/activity-log";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, otp, password } = resetPasswordSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new ApiError("Account not found.", 404);

    if (!user.resetPasswordOTP || user.resetPasswordOTP !== otp) {
      throw new ApiError("Invalid OTP.", 400);
    }
    if (isOtpExpired(user.resetOTPExpiry)) throw new ApiError("OTP has expired.", 400);

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetPasswordOTP: null, resetOTPExpiry: null },
    });

    await sendPasswordChangedEmail(user.email);
    await logActivity({ userId: user.id, action: "RESET_PASSWORD", module: "auth", description: "Password reset via OTP" });

    return ok({}, "Password reset successfully. You can now log in.");
  } catch (err) {
    return handleApiError(err);
  }
}
