// HTTP actions for auth that can use npm packages
import { httpAction } from "./_generated/server";
import bcrypt from "bcryptjs";
import * as jwt from "./jwt";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Register admin
export const register = httpAction(async (ctx, request) => {
  const { username, password, email } = await request.json();

  if (!username || !password || !email) {
    return new Response(
      JSON.stringify({ message: "Please provide all fields" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Check if admin exists
  const existingByUsername = await ctx.runQuery("auth:checkUsername", {
    username,
  });
  const existingByEmail = await ctx.runQuery("auth:checkEmail", { email });

  if (existingByUsername || existingByEmail) {
    return new Response(
      JSON.stringify({ message: "Admin already exists" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create admin
  const adminId = await ctx.runMutation("auth:createAdmin", {
    username,
    password: hashedPassword,
    email,
  });

  return new Response(
    JSON.stringify({ message: "Admin created successfully", id: adminId }),
    { status: 201, headers: { "Content-Type": "application/json" } }
  );
});

// Login admin
export const login = httpAction(async (ctx, request) => {
  const { username, password } = await request.json();

  if (!username || !password) {
    return new Response(
      JSON.stringify({ message: "Please provide username and password" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Get admin
  const admin = await ctx.runQuery("auth:getAdminByUsername", { username });

  if (!admin) {
    return new Response(
      JSON.stringify({ message: "Invalid credentials" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return new Response(
      JSON.stringify({ message: "Invalid credentials" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // Create JWT token
  const token = await jwt.sign({ adminId: admin._id }, JWT_SECRET);

  return new Response(
    JSON.stringify({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});

// Verify token
export const verify = httpAction(async (ctx, request) => {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "") || "";

  if (!token) {
    return new Response(
      JSON.stringify({ message: "No token provided" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const result = await jwt.verify(token, JWT_SECRET);
    if (!result.valid || !result.payload) {
      throw new Error("Invalid token");
    }
    const admin = await ctx.runQuery("auth:getAdminById", {
      id: result.payload.adminId as any,
    });

    if (!admin) {
      return new Response(
        JSON.stringify({ message: "Admin not found" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Invalid token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
});

