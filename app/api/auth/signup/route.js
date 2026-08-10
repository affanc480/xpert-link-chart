import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validators";
import { ok, handleApiError, ApiError } from "@/lib/response";
import { generateOTP, otpExpiryDate } from "@/lib/otp";
import { sendOtpEmail, sendWelcomeEmail } from "@/lib/email";
import { logActivity } from "@/lib/activity-log";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`signup:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!limited.allowed) throw new ApiError("Too many attempts. Try again shortly.", 429);

    const body = await request.json();
    const data = signupSchema.parse(body);

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new ApiError("An account with this email already exists.", 409);

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const otp = generateOTP();

    const user = await prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        company: data.company,
        businessType: data.businessType,
        country: data.country,
        verificationOTP: otp,
        otpExpiry: otpExpiryDate(10),
      },
    });

    await Promise.all([
      sendOtpEmail(user.email, otp, "verification"),
      sendWelcomeEmail(user.email, user.fullName),
    ]);

    await logActivity({
      userId: user.id,
      action: "SIGNUP",
      module: "auth",
      description: "Account created",
      ip,
    });

    return ok(
      { email: user.email },
      "Account created. Please check your email for the verification code.",
      201
    );
  } catch (err) {
    return handleApiError(err);
  }
}
