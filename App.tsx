// src/App.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import React, { useEffect } from "react";
import TodoList from "./src/components/TodoList";
import { ConnectivityProvider } from "./src/context/ConnectivityContext";
import { queryClient } from "./src/queryClient";

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 3000,
});

export default function App() {
  useEffect(() => {
    const loadPausedMutations = async () => {
      try {
        const pausedMutationsString = await AsyncStorage.getItem("pausedMutations");
        const pausedMutations = pausedMutationsString ? JSON.parse(pausedMutationsString) : [];
        console.log("Paused Mutations:", pausedMutations);
      } catch (e) {
        console.error("Failed to load paused mutations:", e);
      }
    };

    loadPausedMutations();
  }, []);

  return (
    <ConnectivityProvider>
      <PersistQueryClientProvider
        onSuccess={() =>
          queryClient.resumePausedMutations().then(() => queryClient.invalidateQueries())
        }
        persistOptions={{ persister }}
        client={queryClient}
      >
        {/* CacheClearer component could be here if you uncomment and define it */}
        <TodoList />
      </PersistQueryClientProvider>
    </ConnectivityProvider>
  );
}
