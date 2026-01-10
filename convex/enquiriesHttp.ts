// HTTP actions for protected enquiry operations
import { httpAction } from "./_generated/server";
import * as jwt from "./jwt";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Helper to verify token and get admin ID
async function verifyAuth(request: Request): Promise<string | null> {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "") || "";

  if (!token) {
    return null;
  }

  const result = await jwt.verify(token, JWT_SECRET);
  if (!result.valid || !result.payload) {
    return null;
  }
  return result.payload.adminId as string;
}

// Protected: Get all enquiries
export const list = httpAction(async (ctx, request) => {
  const adminId = await verifyAuth(request);
  if (!adminId) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const interest = url.searchParams.get("interest");

  const enquiries = await ctx.runQuery("enquiries:list", {
    status: status as any,
    interest: interest || undefined,
  });

  return new Response(JSON.stringify(enquiries), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});

// Protected: Get statistics
export const stats = httpAction(async (ctx, request) => {
  const adminId = await verifyAuth(request);
  if (!adminId) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const statsData = await ctx.runQuery("enquiries:stats", {});

  return new Response(JSON.stringify(statsData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});

// Protected: Update enquiry
export const update = httpAction(async (ctx, request) => {
  const adminId = await verifyAuth(request);
  if (!adminId) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const { id, ...updates } = await request.json();

  const updated = await ctx.runMutation("enquiries:update", {
    id,
    ...updates,
  });

  return new Response(JSON.stringify(updated), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});

// Protected: Delete enquiry
export const remove = httpAction(async (ctx, request) => {
  const adminId = await verifyAuth(request);
  if (!adminId) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const { id } = await request.json();

  await ctx.runMutation("enquiries:remove", { id });

  return new Response(
    JSON.stringify({ message: "Enquiry deleted successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
});

