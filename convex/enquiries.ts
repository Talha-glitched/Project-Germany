import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Public: Submit a new enquiry (contact form)
export const create = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    // Validation
    if (!args.name || !args.email || !args.phone) {
      throw new Error("Please provide name, email, and phone.");
    }

    const enquiryId = await ctx.db.insert("enquiries", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      interest: args.interest || "Other",
      message: args.message || "",
      status: "pending",
      notes: "",
      createdAt: Date.now(),
    });

    return await ctx.db.get(enquiryId);
  },
});

// Protected: Get all enquiries with optional filters
export const list = query({
  args: {
    status: v.optional(v.union(v.literal("pending"), v.literal("contacted"), v.literal("resolved"))),
    interest: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let enquiries;
    
    if (args.status) {
      enquiries = await ctx.db
        .query("enquiries")
        .withIndex("by_status", (q) => q.eq("status", args.status))
        .collect();
    } else {
      enquiries = await ctx.db.query("enquiries").collect();
    }

    // Filter by interest if provided
    if (args.interest) {
      enquiries = enquiries.filter((e) => e.interest === args.interest);
    }

    // Sort by createdAt descending
    enquiries.sort((a, b) => b.createdAt - a.createdAt);

    return enquiries;
  },
});

// Protected: Get single enquiry
export const get = query({
  args: {
    id: v.id("enquiries"),
  },
  handler: async (ctx, args) => {
    const enquiry = await ctx.db.get(args.id);
    if (!enquiry) {
      throw new Error("Enquiry not found");
    }
    return enquiry;
  },
});

// Protected: Update enquiry
export const update = mutation({
  args: {
    id: v.id("enquiries"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    interest: v.optional(
      v.union(
        v.literal("German Consultancy"),
        v.literal("University Selection"),
        v.literal("Application Assistance"),
        v.literal("Visa Support"),
        v.literal("Accommodation"),
        v.literal("Language Courses"),
        v.literal("Career Guidance"),
        v.literal("Other")
      )
    ),
    message: v.optional(v.string()),
    status: v.optional(v.union(v.literal("pending"), v.literal("contacted"), v.literal("resolved"))),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    const enquiry = await ctx.db.get(id);
    if (!enquiry) {
      throw new Error("Enquiry not found");
    }

    await ctx.db.patch(id, updates);
    return await ctx.db.get(id);
  },
});

// Protected: Delete enquiry
export const remove = mutation({
  args: {
    id: v.id("enquiries"),
  },
  handler: async (ctx, args) => {
    const enquiry = await ctx.db.get(args.id);
    if (!enquiry) {
      throw new Error("Enquiry not found");
    }
    await ctx.db.delete(args.id);
    return { message: "Enquiry deleted successfully" };
  },
});

// Protected: Get statistics
export const stats = query({
  args: {},
  handler: async (ctx) => {
    const allEnquiries = await ctx.db.query("enquiries").collect();

    const total = allEnquiries.length;
    const pending = allEnquiries.filter((e) => e.status === "pending").length;
    const contacted = allEnquiries.filter((e) => e.status === "contacted").length;
    const resolved = allEnquiries.filter((e) => e.status === "resolved").length;

    // Get enquiries by interest
    const byInterestMap = new Map<string, number>();
    allEnquiries.forEach((enquiry) => {
      const count = byInterestMap.get(enquiry.interest) || 0;
      byInterestMap.set(enquiry.interest, count + 1);
    });

    const byInterest = Array.from(byInterestMap.entries())
      .map(([interest, count]) => ({ _id: interest, count }))
      .sort((a, b) => b.count - a.count);

    // Get recent enquiries (last 7 days)
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentEnquiries = allEnquiries.filter(
      (e) => e.createdAt >= sevenDaysAgo
    ).length;

    return {
      total,
      pending,
      contacted,
      resolved,
      byInterest,
      recentEnquiries,
    };
  },
});

