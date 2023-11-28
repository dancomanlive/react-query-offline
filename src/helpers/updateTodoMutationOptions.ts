import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import * as todoService from "../api/todoService";
import { REACT_QUERY_OFFLINE_CACHE } from "../constants/reactQueryOfflineCache";
import { Todo, TodoUpdateInput } from "../shared-types";

interface MutationDetails {
  queryKey: string;
  variables: TodoUpdateInput; // Assuming TodoUpdateInput is the type of your mutation variables
  timestamp: number;
}

// Custom function to log mutation to React Query's offline cache
const logMutationToOfflineCache = async (mutationDetails: MutationDetails) => {
  const cacheString = await AsyncStorage.getItem(REACT_QUERY_OFFLINE_CACHE);
  if (cacheString) {
    const cache = JSON.parse(cacheString);
    cache.mutations = cache.mutations || [];
    cache.mutations.push(mutationDetails);
    await AsyncStorage.setItem(REACT_QUERY_OFFLINE_CACHE, JSON.stringify(cache));
  }
};

// Custom solution for handling mutation persistence
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
    retry: 3,
    // Prepares for mutation execution by first canceling any ongoing refetches
    // and then performing an optimistic update on the cache.
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      // // Determine which property changed
      // let mutationType = "";
      // if ("text" in updatedTodo) {
      //   mutationType = "updateTodoText";
      // } else if ("completed" in updatedTodo) {
      //   mutationType = "updateTodoStatus";
      // }

      // Perform the optimistic update
      if (previousTodos) {
        queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
          old.map((todo) => (todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo))
        );
      }

      // Context for potential rollback
      const context = { previousTodos };

      // Log the mutation details to the offline cache when offline
      if (false) {
        await logMutationToOfflineCache({
          queryKey: mutationType,
          variables: updatedTodo,
          timestamp: Date.now(),
        });
      }

      return context;
    },

    // Handles mutation errors by rolling back optimistic updates using the context provided.
    onError: () => {},

    // Cleanup or finalization logic after the mutation is either successful or unsuccessful.
    onSettled: () => {
      // Ensure the latest todo data is fetched by invalidating the relevant queries.
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  };
}
