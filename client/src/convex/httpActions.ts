// Helper to call Convex HTTP actions
// HTTP actions are accessible at: https://{deployment}.convex.cloud/http/{actionName}
import { convex } from "./client";

export const getHttpActionUrl = (actionName: string): string => {
  const convexUrl = import.meta.env.VITE_CONVEX_URL || "";
  if (!convexUrl) {
    throw new Error("VITE_CONVEX_URL is not set");
  }
  // Extract base URL (remove trailing slash if present)
  const baseUrl = convexUrl.replace(/\/$/, "");
  
  // HTTP actions are accessible at /http/{file}:{action}
  // Map frontend action names to Convex file:action format
  const actionMap: Record<string, string> = {
    // Auth actions from authHttp.ts
    login: "authHttp:login",
    register: "authHttp:register",
    verify: "authHttp:verify",
    // Enquiry actions from enquiriesHttp.ts (called as "enquiries:list", etc.)
    "enquiries:list": "enquiriesHttp:list",
    "enquiries:stats": "enquiriesHttp:stats",
    "enquiries:update": "enquiriesHttp:update",
    "enquiries:remove": "enquiriesHttp:remove",
  };
  
  // If actionName already has ":" it might already be in the correct format
  // Otherwise use the mapping
  const mappedAction = actionMap[actionName] || (actionName.includes(":") ? actionName : actionName);
  return `${baseUrl}/http/${mappedAction}`;
};

export const callHttpAction = async (
  actionName: string,
  options: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
  } = {}
): Promise<Response> => {
  const url = getHttpActionUrl(actionName);
  const { method = "POST", body, headers = {} } = options;

  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
};

