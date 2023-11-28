import { queryClient } from "../queryClient";

export const clearQueryCache = () => {
  queryClient.clear();
  console.log("Query cache cleared");
};
