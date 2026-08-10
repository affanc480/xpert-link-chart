import { prisma } from "@/lib/prisma";

export async function logActivity({ userId, action, module, description, ip }) {
  try {
    await prisma.activityLog.create({
      data: { userId, action, module, description, ip },
    });
  } catch (err) {
    console.error("[ACTIVITY_LOG_ERROR]", err);
  }
}
