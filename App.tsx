// src/App.tsx
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import CacheClearer from "./src/components/CacheClearer";
import PausedMutationsDisplay from "./src/components/PausedMutationsDisplay";
import TodoList from "./src/components/TodoList";
import { queryClient } from "./src/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheClearer />
      <TodoList />
      <PausedMutationsDisplay />
    </QueryClientProvider>
  );
}
