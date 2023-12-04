import { UseQueryOptions } from "@tanstack/react-query";
import { getTodos } from "../api/todoService";
import { Todo } from "../types";

export const todosQueryOptions: UseQueryOptions<Todo[], Error> = {
  queryKey: ["todos"], // This is the queryKey in an object
  queryFn: getTodos, // This is your query function
};
