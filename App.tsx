// src/App.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import React from "react";
import { Alert } from "react-native";
import * as ReactQueryDevtools from "react-query-native-devtools";
import ToastManager from "toastify-react-native";
import { updateTodo } from "./src/api/todoService";
import TodoList from "./src/components/TodoList";
import { queryClient } from "./src/queryClient";
import { TodoUpdateInput } from "./src/shared-types";

if (__DEV__ && !process.env.JEST_WORKER_ID) {
  ReactQueryDevtools.addPlugin({ queryClient });
}

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

// Default mutation function for todos
const defaultUpdateTodoMutation = (todoUpdate: TodoUpdateInput) => {
  Alert.alert(
    "🚀 ~ file: App.tsx:28 ~ defaultUpdateTodoMutation ~ todoUpdate:",
    JSON.stringify(todoUpdate)
  );
  return updateTodo(todoUpdate);
};

// Set the default mutation for 'todos'
queryClient.setMutationDefaults(["todos"], {
  mutationFn: defaultUpdateTodoMutation,
});

export default function App() {
  // removePausedMutations();
  // queryClient.clear();

  return (
    <PersistQueryClientProvider
      // onSuccess={() => {
      //   queryClient.resumePausedMutations().then(() => {
      //     console.log("Resumed paused mutations");
      //     queryClient.invalidateQueries();
      //   });
      // }}
      persistOptions={{ persister }}
      client={queryClient}
    >
      <ToastManager />
      <TodoList />
    </PersistQueryClientProvider>
  );
}
