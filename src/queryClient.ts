import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        console.log("Global mutation error:", error);
      },
      onSuccess: (data) => {
        console.log("Global mutation success:", data);
      },
    },
    queries: {
      networkMode: "offlineFirst",
      gcTime: Infinity,
      staleTime: Infinity,
    },
  },
});
