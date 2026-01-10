import { ConvexReactClient } from "convex/react";

// Get the Convex URL from environment variable
const convexUrl = import.meta.env.VITE_CONVEX_URL || "";

// Create client (will work even if URL is empty - will show error when used)
export const convex = new ConvexReactClient(convexUrl || "https://placeholder.convex.cloud");

