import { useMutation, useQuery } from "@tanstack/react-query";
import { addTodoMutationOptions } from "../helpers/addTodoMutationOptions";
import { deleteTodoMutationOptions } from "../helpers/deleteTodoMutationOptions";
import { todosQueryOptions } from "../helpers/todosQueryOptions";
import { updateTodoMutationOptions } from "../helpers/updateTodoMutationOptions";
import { Todo } from "../shared-types";

// useTodo is a custom hook that encapsulates the logic for fetching and mutating todo data.
export const useTodo = () => {
  // Fetches the list of todos using React Query's useQuery hook.
  // The todosQueryOptions object contains the configuration for this query,
  // including the fetch function and cache configuration.
  const { data: todos, isFetching } = useQuery<Todo[], Error>(todosQueryOptions);

  // Sets up mutations for updating, adding, and deleting todos.
  // Each mutation uses options defined in separate helper files for clarity and reusability.
  const updateTodoMutation = useMutation(updateTodoMutationOptions());
  // console.log("🚀 ~ file: useTodo.ts:18 ~ useTodo ~ updateTodoMutation:", updateTodoMutation.error);
  const addTodoMutation = useMutation(addTodoMutationOptions());
  const deleteTodoMutation = useMutation(deleteTodoMutationOptions());

  // Exposes the fetched todos, the fetching status, and functions to mutate todos.
  // The .mutate method from each mutation is provided for components to trigger these mutations.
  return {
    todos,
    isFetching,
    updateTodoMutation: updateTodoMutation.mutate,
    addTodoMutation: addTodoMutation.mutate,
    deleteTodoMutation: deleteTodoMutation.mutate,
  };
};
