import { UseQueryOptions } from "@tanstack/react-query";
import { getTodos } from "../api/todoService";
import { queryKeys } from "../constants/queryKeys";
import { Todo } from "../types";

export const todosQueryOptions: UseQueryOptions<Todo[], Error> = {
  queryKey: [queryKeys.TODOS], // This is the queryKey in an object
  queryFn: getTodos, // This is your query function
};
