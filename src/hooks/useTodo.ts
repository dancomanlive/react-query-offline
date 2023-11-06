// src/hooks/useTodo.ts
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import * as todoService from "../api/todoService";
import { Todo } from "../types";
import { getMutationOptions } from "./mutationOptions";

export const useTodo = () => {
  const queryClient = useQueryClient();

  // Define the query options object
  const todosQueryOptions: UseQueryOptions<Todo[], Error> = {
    queryKey: ["todos"], // This is the queryKey in an object
    queryFn: todoService.getTodos, // This is your query function
    // You can add more options here like 'staleTime', 'cacheTime', etc.
  };

  // Use the options object in the useQuery hook
  const { data: todos, isFetching } = useQuery<Todo[], Error>(todosQueryOptions);
  const updateTodoMutation = useMutation(getMutationOptions(queryClient));

  return {
    todos,
    isFetching,
    updateTodo: updateTodoMutation.mutate,
  };
};
