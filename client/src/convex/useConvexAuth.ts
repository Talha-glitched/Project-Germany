import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useState, useEffect } from "react";

// Custom hook for authentication with Convex
export function useConvexAuth() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("adminToken")
  );
  const [user, setUser] = useState<any>(
    localStorage.getItem("adminUser")
      ? JSON.parse(localStorage.getItem("adminUser")!)
      : null
  );
  const [loading, setLoading] = useState(true);

  const loginMutation = useMutation(api.auth.login);
  const verifyQuery = useQuery(
    api.auth.verify,
    token ? { token } : "skip"
  );

  useEffect(() => {
    if (token) {
      // Token verification happens via query
      if (verifyQuery === undefined) {
        // Still loading
        return;
      }
      if (verifyQuery === null) {
        // Error - invalid token
        logout();
      } else {
        // Valid token
        setUser(verifyQuery.admin);
      }
    }
    setLoading(false);
  }, [token, verifyQuery]);

  const login = async (username: string, password: string) => {
    try {
      const result = await loginMutation({ username, password });
      setToken(result.token);
      setUser(result.admin);
      localStorage.setItem("adminToken", result.token);
      localStorage.setItem("adminUser", JSON.stringify(result.admin));
      return result;
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
  };

  return {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token && !!user,
    loading,
  };
}

