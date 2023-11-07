// src/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

/* The code is creating a new instance of the `QueryClient` class and exporting it as `queryClient`.
The `QueryClient` is a client for managing and caching data queries in the React Query library. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      staleTime: Infinity,
    },
  },
});
