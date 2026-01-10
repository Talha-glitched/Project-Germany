import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  admins: defineTable({
    username: v.string(),
    password: v.string(), // Hashed password
    email: v.string(),
    createdAt: v.number(),
  })
    .index("by_username", ["username"])
    .index("by_email", ["email"]),

  enquiries: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    interest: v.union(
      v.literal("German Consultancy"),
      v.literal("University Selection"),
      v.literal("Application Assistance"),
      v.literal("Visa Support"),
      v.literal("Accommodation"),
      v.literal("Language Courses"),
      v.literal("Career Guidance"),
      v.literal("Other")
    ),
    message: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("contacted"),
      v.literal("resolved")
    ),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_interest", ["interest"])
    .index("by_createdAt", ["createdAt"]),
});

