// src/App.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { onlineManager, useIsRestoring } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import React from "react";
import * as ReactQueryDevtools from "react-query-native-devtools";
import { addTodo, deleteTodo, updateTodo } from "./src/api/todoService";
import TodoList from "./src/components/TodoList";
import { queryClient } from "./src/queryClient";
import { TodoUpdateInput } from "./src/types";

if (__DEV__ && !process.env.JEST_WORKER_ID) {
  ReactQueryDevtools.addPlugin({ queryClient });
}

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const defaultAddTodoMutation = async (text: string) => {
  await queryClient.cancelQueries({ queryKey: ["todos"] });
  return addTodo(text);
};

const defaultDeleteTodoMutation = async (todoId: number) => {
  await queryClient.cancelQueries({ queryKey: ["todos"] });
  return deleteTodo(todoId);
};

const defaultUpdateTodoMutation = async (todoUpdate: TodoUpdateInput) => {
  await queryClient.cancelQueries({ queryKey: ["todos"] });
  return updateTodo(todoUpdate);
};

queryClient.setMutationDefaults(["addTodo"], {
  mutationFn: defaultAddTodoMutation,
});

queryClient.setMutationDefaults(["deleteTodo"], {
  mutationFn: defaultDeleteTodoMutation,
});

queryClient.setMutationDefaults(["updateTodo"], {
  mutationFn: defaultUpdateTodoMutation,
});

export default function App() {
  // queryClient.clear();
  const isRestoring = useIsRestoring();

  return (
    <PersistQueryClientProvider
      onSuccess={() => {
        if (onlineManager.isOnline() && !isRestoring) {
          queryClient.resumePausedMutations().then(() => {
            queryClient.invalidateQueries();
          });
        }
      }}
      persistOptions={{ persister }}
      client={queryClient}
    >
      <TodoList />
    </PersistQueryClientProvider>
  );
}
