import { requireUser } from "@/lib/rbac";
import { ok, handleApiError, ApiError } from "@/lib/response";
import { logActivity } from "@/lib/activity-log";
import { prisma } from "@/lib/prisma";

/**
 * Builds GET (list) + POST (create) handlers for a Prisma model that is
 * scoped to the logged-in user (model must have a `userId` field).
 *
 * model:        prisma model name, e.g. "inventory"
 * schema:       zod schema used to validate POST body
 * searchFields: string fields to apply `?q=` search across
 * moduleName:   label used in activity logs
 */
export function createListCreateHandler({ model, schema, searchFields = [], moduleName }) {
  async function GET(request) {
    try {
      const user = await requireUser();
      const { searchParams } = new URL(request.url);

      const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
      const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
      const q = searchParams.get("q")?.trim();
      const sortBy = searchParams.get("sortBy") || "createdAt";
      const sortDir = searchParams.get("sortDir") === "asc" ? "asc" : "desc";

      const where = { userId: user.id };
      if (q && searchFields.length) {
        where.OR = searchFields.map((field) => ({
          [field]: { contains: q, mode: "insensitive" },
        }));
      }

      const [items, total] = await Promise.all([
        prisma[model].findMany({
          where,
          orderBy: { [sortBy]: sortDir },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma[model].count({ where }),
      ]);

      return ok(
        { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } },
        "Fetched successfully"
      );
    } catch (err) {
      return handleApiError(err);
    }
  }

  async function POST(request) {
    try {
      const user = await requireUser();
      const body = await request.json();
      const data = schema.parse(body);

      const created = await prisma[model].create({
        data: { ...data, userId: user.id },
      });

      await logActivity({
        userId: user.id,
        action: "CREATE",
        module: moduleName,
        description: `Created ${moduleName} record ${created.id}`,
      });

      return ok(created, "Created successfully", 201);
    } catch (err) {
      return handleApiError(err);
    }
  }

  return { GET, POST };
}

/**
 * Builds GET (one) + PATCH (update) + DELETE handlers for a single record,
 * scoped so a user can only touch their own rows (or an ADMIN can touch any).
 */
export function createItemHandler({ model, schema, moduleName, immutableFields = [] }) {
  async function GET(_request, { params }) {
    try {
      const user = await requireUser();
      const { id } = await params;

      const item = await prisma[model].findFirst({
        where: { id, userId: user.id },
      });
      if (!item) throw new ApiError("Record not found.", 404);

      return ok(item, "Fetched successfully");
    } catch (err) {
      return handleApiError(err);
    }
  }

  async function PATCH(request, { params }) {
    try {
      const user = await requireUser();
      const { id } = await params;

      const existing = await prisma[model].findFirst({ where: { id, userId: user.id } });
      if (!existing) throw new ApiError("Record not found.", 404);

      const body = await request.json();
      const data = schema.partial().parse(body);

      // Once a record has been created, certain fields (e.g. its code) are
      // permanent and must never change, no matter what the client sends.
      for (const field of immutableFields) {
        delete data[field];
      }

      const updated = await prisma[model].update({ where: { id }, data });

      await logActivity({
        userId: user.id,
        action: "UPDATE",
        module: moduleName,
        description: `Updated ${moduleName} record ${id}`,
      });

      return ok(updated, "Updated successfully");
    } catch (err) {
      return handleApiError(err);
    }
  }

  async function DELETE(_request, { params }) {
    try {
      const user = await requireUser();
      const { id } = await params;

      const existing = await prisma[model].findFirst({ where: { id, userId: user.id } });
      if (!existing) throw new ApiError("Record not found.", 404);

      await prisma[model].delete({ where: { id } });

      await logActivity({
        userId: user.id,
        action: "DELETE",
        module: moduleName,
        description: `Deleted ${moduleName} record ${id}`,
      });

      return ok({ id }, "Deleted successfully");
    } catch (err) {
      return handleApiError(err);
    }
  }

  return { GET, PATCH, DELETE };
}
