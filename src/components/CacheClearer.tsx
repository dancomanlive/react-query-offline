// src/components/CacheClearer.tsx
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const CacheClearer = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.clear();
  }, [queryClient]);

  return null; // This component doesn't render anything
};

export default CacheClearer;
