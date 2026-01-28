import { BASE_URL } from "@/app/page";
import { useQuery } from "@tanstack/react-query";

async function getUser() {
  const response = await fetch(`${BASE_URL}auth/profile`, {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }
  return data;
}

export function useAuth() {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    select: (response) => response.data,
  });

  return {
    user: query.data?.user,
    loading: query.isLoading,
    ...query,
  };
}
