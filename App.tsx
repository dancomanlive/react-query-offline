// src/App.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { onlineManager } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import React from "react";
import * as ReactQueryDevtools from "react-query-native-devtools";
import ToastManager from "toastify-react-native";
import { addTodo, deleteTodo, updateTodo } from "./src/api/todoService";
import TodoList from "./src/components/TodoList";
import { queryClient } from "./src/queryClient";
import { TodoUpdateInput } from "./src/shared-types";

if (__DEV__ && !process.env.JEST_WORKER_ID) {
  ReactQueryDevtools.addPlugin({ queryClient });
}

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const defaultAddTodoMutation = (text: string) => {
  return addTodo(text);
};

const defaultDeleteTodoMutation = (todoId: number) => {
  return deleteTodo(todoId);
};

const defaultUpdateTodoMutation = (todoUpdate: TodoUpdateInput) => {
  return updateTodo(todoUpdate);
};

queryClient.setMutationDefaults(["addTodo"], {
  mutationFn: defaultAddTodoMutation,
});

queryClient.setMutationDefaults(["deleteTodo"], {
  mutationFn: defaultDeleteTodoMutation,
});

queryClient.setMutationDefaults(["todos"], {
  mutationFn: defaultUpdateTodoMutation,
});

export default function App() {
  // queryClient.clear();

  return (
    <PersistQueryClientProvider
      onSuccess={() => {
        if (onlineManager.isOnline()) {
          queryClient.resumePausedMutations().then(() => {
            queryClient.invalidateQueries();
          });
        }
      }}
      persistOptions={{ persister }}
      client={queryClient}
    >
      <ToastManager />
      <TodoList />
    </PersistQueryClientProvider>
  );
}
