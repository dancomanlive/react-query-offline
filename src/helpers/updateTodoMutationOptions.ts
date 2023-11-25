import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import * as todoService from "../api/todoService";
import { Todo, TodoUpdateInput } from "../shared-types";

export function updateTodoMutationOptions(): UseMutationOptions<
  Todo,
  Error,
  TodoUpdateInput,
  { previousTodos?: Todo[] }
> {
  const queryClient = useQueryClient();
  const netInfo = useNetInfo(); // Checking network status
  return {
    // Define the mutation function which calls the update service for a todo item.
    mutationFn: todoService.updateTodo,

    // Prepares for mutation execution by first canceling any ongoing refetches
    // and then performing an optimistic update on the cache.
    onMutate: async (updatedTodo) => {
      // Prevent refetches from overwriting pending updates by canceling query refetches.
      await queryClient.cancelQueries({
        queryKey: ["todos"],
      });

      // Snapshot the current state before the mutation to allow for rollbacks.
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      // Update the todo item optimistically in the cache to reflect the changes immediately.
      if (previousTodos) {
        queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
          old.map((todo) => (todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo))
        );
      }

      // Object to hold potential rollback information to undo the optimistic update if needed.
      const context = { previousTodos };

      // If offline, store the pending mutation in AsyncStorage for execution when online.
      if (!netInfo.isConnected) {
        // Retrieve any previously stored mutations from AsyncStorage.
        const pausedMutationsString = await AsyncStorage.getItem("pausedMutations");
        const pausedMutations = pausedMutationsString ? JSON.parse(pausedMutationsString) : [];

        // Check if the current mutation is already stored to prevent duplicates.
        const existingMutationIndex = pausedMutations.findIndex((m) => m.id === updatedTodo.id);
        // Update the stored mutation with new data or push it if it's a new mutation.
        if (existingMutationIndex === -1) {
          pausedMutations.push(updatedTodo);
        } else {
          pausedMutations[existingMutationIndex] = updatedTodo;
        }
        // Persist the updated list of mutations to AsyncStorage.
        await AsyncStorage.setItem("pausedMutations", JSON.stringify(pausedMutations));
      }

      // Return the rollback context for use if the mutation fails later.
      return context;
    },

    // Handles mutation errors by rolling back optimistic updates using the context provided.
    onError: (err: Error, newTodo: TodoUpdateInput, context?: { previousTodos?: Todo[] }) => {
      // If there's a previous state available, revert to it to undo the optimistic update.
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },

    // Cleanup or finalization logic after the mutation is either successful or unsuccessful.
    onSettled: () => {
      // Ensure the latest todo data is fetched by invalidating the relevant queries.
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  };
}
