import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Helper queries for HTTP actions
export const checkUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const admin = await ctx.db
      .query("admins")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
    return !!admin;
  },
});

export const checkEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const admin = await ctx.db
      .query("admins")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    return !!admin;
  },
});

export const getAdminByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("admins")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
  },
});

export const getAdminById = query({
  args: { id: v.id("admins") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createAdmin = mutation({
  args: {
    username: v.string(),
    password: v.string(), // Already hashed
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const adminId = await ctx.db.insert("admins", {
      username: args.username,
      password: args.password,
      email: args.email,
      createdAt: Date.now(),
    });
    return adminId;
  },
});
