import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validators";
import { ok, handleApiError, ApiError } from "@/lib/response";
import { sendContactNotification } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!limited.allowed) throw new ApiError("Too many messages sent. Try again shortly.", 429);

    const body = await request.json();
    const data = contactSchema.parse(body);

    const saved = await prisma.contactMessage.create({ data });
    await sendContactNotification(data);

    return ok({ id: saved.id }, "Your message has been sent. We'll get back to you soon.", 201);
  } catch (err) {
    return handleApiError(err);
  }
}
