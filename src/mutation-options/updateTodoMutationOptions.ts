import { useQueryClient } from "@tanstack/react-query";
import * as todoService from "../api/todoService";
import { useNetworkState } from "../hooks/useNetworkState";
import { MutationStateContext, Todo, TodoUpdateInput } from "../types";

// Custom solution for handling mutation persistence
export function updateTodoMutationOptions() {
  const queryClient = useQueryClient();
  const isConnected = useNetworkState();
  return {
    // mutationKey is critical and must match the key used in setMutationDefaults
    mutationKey: ["updateTodo"],
    // The function to call when this mutation is executed. It calls the updateTodo function from the todoService.
    mutationFn: todoService.updateTodo,
    // Called immediately before the mutation function. Used for optimistic updates.
    onMutate: async (updatedTodo: TodoUpdateInput) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      // If offline, store the mutation in the offline cache
      if (!isConnected) {
        // Perform the optimistic update for online scenario
        if (previousTodos) {
          queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
            old.map((todo) => (todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo))
          );
        }
      }

      return { previousTodos };
    },

    onError: (context: MutationStateContext) => {
      // Rollback optimistic updates if mutation fails
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      // Invalidate and refetch after mutation settles
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    retry: 3,
  };
}
