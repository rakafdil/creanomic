import { useEffect, useState } from "react";

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // only run on client
    const t =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    setToken(t);
    setLoading(false);
  }, []);

  return { token, loading };
}
