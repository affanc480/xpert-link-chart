import { NextResponse } from "next/server";

export function ok(data = {}, message = "Success", status = 200) {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function fail(message = "Something went wrong", status = 400, error = null) {
  return NextResponse.json(
    { success: false, message, error: error ? String(error) : undefined },
    { status }
  );
}

export function handleApiError(err, fallback = "Internal Server Error") {
  console.error("[API_ERROR]", err);

  if (err?.name === "ZodError") {
    const first = err.issues?.[0];
    return fail(first?.message || "Validation failed", 422);
  }

  if (err?.code === "P2002") {
    return fail("A record with these details already exists.", 409);
  }

  if (err?.code === "P2025") {
    return fail("Record not found.", 404);
  }

  if (err?.status) {
    return fail(err.message, err.status);
  }

  return fail(fallback, 500);
}

export class ApiError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}
