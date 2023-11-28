// src/App.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import React from "react";
import * as ReactQueryDevtools from "react-query-native-devtools";
import TodoList from "./src/components/TodoList";
import { queryClient } from "./src/queryClient";
import { logAllDataInAsyncStorage } from "./src/utils/logAllDataInAsyncStorage";

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

// queryClient.getQueryCache().subscribe((data) => {
//   console.log(JSON.stringify(data, null, 2));
// });

/* The code block `if (__DEV__) { ReactQueryDevtools.addPlugin({ queryClient }); }` is checking if the
code is running in a development environment. If it is, it adds the `queryClient` instance to the
React Query Devtools plugin. This allows you to inspect and debug the state and behavior of queries
using the React Query Devtools tool. */
if (__DEV__ && !process.env.JEST_WORKER_ID) {
  ReactQueryDevtools.addPlugin({ queryClient });
}

export default function App() {
  logAllDataInAsyncStorage();
  // useEffect(() => {
  //   const loadPausedMutations = async () => {
  //     try {
  //       const pausedMutationsString = await AsyncStorage.getItem("pausedMutations");
  //       const pausedMutations = pausedMutationsString ? JSON.parse(pausedMutationsString) : [];
  //       console.log("Paused Mutations:", pausedMutations);
  //     } catch (e) {
  //       console.error("Failed to load paused mutations:", e);
  //     }
  //   };

  //   loadPausedMutations();
  // }, []);

  return (
    <PersistQueryClientProvider
      onSuccess={() =>
        queryClient.resumePausedMutations().then(() => {
          // queryClient.invalidateQueries();
          // AsyncStorage.removeItem("pausedMutations");
        })
      }
      persistOptions={{ persister }}
      client={queryClient}
    >
      <TodoList />
    </PersistQueryClientProvider>
  );
}
