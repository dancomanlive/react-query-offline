import { useQueryClient } from "@tanstack/react-query";
import * as todoService from "../api/todoService";
import { useNetworkState } from "../hooks/useNetworkState";
import { Todo, TodoUpdateInput } from "../shared-types";
import { Context } from "../shared-types/context";

// Custom solution for handling mutation persistence
export function updateTodoMutationOptions() {
  const queryClient = useQueryClient();
  const isConnected = useNetworkState();
  return {
    mutationKey: ["updateTodo"],
    mutationFn: todoService.updateTodo,
    onMutate: async (updatedTodo: TodoUpdateInput) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      const context = { previousTodos };

      // If offline, store the mutation in the offline cache
      if (!isConnected) {
        // Perform the optimistic update for online scenario
        if (previousTodos) {
          queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
            old.map((todo) => (todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo))
          );
        }
      }

      return context;
    },

    onError: (context: Context) => {
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
