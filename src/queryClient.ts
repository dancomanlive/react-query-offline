import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        // Toast.error("Global mutation error", "top");
        console.log("Global mutation error:", error);
      },
      onSuccess: (data) => {
        // Toast.success("Global mutation success");
        console.log("Global mutation success:", data);
      },
      // other default options for mutations can be specified here
    },
    queries: {
      networkMode: "offlineFirst",
      gcTime: Infinity,
      staleTime: Infinity,
      // other default options for queries can be specified here
    },
  },
  // other configurations for QueryClient
});
