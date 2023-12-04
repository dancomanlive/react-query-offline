import { useQueryClient } from "@tanstack/react-query";
import * as todoService from "../api/todoService";
import { mutationKeys } from "../constants/mutationKeys";
import { queryKeys } from "../constants/queryKeys";
import { useNetworkState } from "../hooks/useNetworkState";
import { MutationStateContext, Todo } from "../types";

export function deleteTodoMutationOptions() {
  const queryClient = useQueryClient();
  const isConnected = useNetworkState();
  return {
    // mutationKey is critical and must match the key used in setMutationDefaults
    mutationKey: [mutationKeys.DELETE_TODO],
    // The function to call when this mutation is executed. It calls the deleteTodo function from the todoService.
    mutationFn: todoService.deleteTodo,
    // Called immediately before the mutation function. Used for optimistic updates.
    onMutate: async (todoId: number) => {
      // Cancel any ongoing refetch queries for todos to prevent them from overwriting our optimistic update.
      await queryClient.cancelQueries({ queryKey: [queryKeys.TODOS] });

      // Snapshot the current state of todos to allow for potential rollbacks.
      const previousTodos = queryClient.getQueryData<Todo[]>([queryKeys.TODOS]);

      if (!isConnected) {
        // Optimistically remove the todo from the local cache to update the UI immediately.
        if (previousTodos) {
          queryClient.setQueryData<Todo[]>(
            [queryKeys.TODOS],
            previousTodos.filter((todo) => todo.id !== todoId)
          );
        }
      }

      // Return the context for potential rollback in case of error.
      return { previousTodos };
    },

    // Called if the mutation encounters an error. Used for rolling back optimistic updates.
    onError: (context: MutationStateContext) => {
      // If there's a previous state available, revert to it to undo the optimistic update.
      if (context?.previousTodos) {
        queryClient.setQueryData([queryKeys.TODOS], context.previousTodos);
      }
    },

    // A cleanup function that runs after the mutation is either successful or fails.
    // Here, it's used to ensure the todo list is up-to-date after the mutation.
    onSettled: () => {
      // Invalidate the todos queries to refetch the up-to-date todos list from the server.
      queryClient.invalidateQueries({ queryKey: [queryKeys.TODOS] });
    },
  };
}
