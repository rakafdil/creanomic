const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5050/api/v1";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    let error: string;
    try {
      const errorData = await res.json();
      error = errorData.error || errorData.message || "Request Failed";
    } catch {
      error = await res.text();
    }
    throw new Error(error || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, body: any) =>
    request<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: <T>(url: string, body: any) =>
    request<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: "DELETE",
      body: body ? JSON.stringify(body) : undefined,
    }),
};
