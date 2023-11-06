// src/hooks/mutationOptions.ts
import { QueryClient, UseMutationOptions } from "@tanstack/react-query";
import * as todoService from "../api/todoService";
import { Todo, TodoUpdateInput } from "../types";

// Function to generate mutation options for updating a todo item
export function getMutationOptions(
  queryClient: QueryClient
): UseMutationOptions<Todo, Error, TodoUpdateInput, { previousTodos?: Todo[] }> {
  return {
    // The function to call to perform the mutation
    mutationFn: todoService.updateTodo,
    // Function that will be run before the mutation function is fired
    onMutate: async (updatedTodo) => {
      // Cancel any outgoing refetches for `todos` so they don't overwrite our optimistic update
      await queryClient.cancelQueries({
        queryKey: ["todos"],
      });

      // Retrieve the current todos from the cache
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      // Optimistically update the cache with the new todo
      if (previousTodos) {
        queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
          old.map((todo) => (todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo))
        );
      }

      // Return the previous state for rollback in case of an error
      return { previousTodos };
    },
    // Function that will be run if the mutation encounters an error
    onError: (err: Error, newTodo: TodoUpdateInput, context?: { previousTodos?: Todo[] }) => {
      // Roll back the optimistic update if the mutation fails
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    // Function that will be run when the mutation has either succeeded or failed
    onSettled: () => {
      // Invalidate the `todos` queries to refetch the latest data
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  };
}
