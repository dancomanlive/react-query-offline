import { queryClient } from "../queryClient";

export const getDataForTodosQuery = () => {
  const todosData = queryClient.getQueryData(["todos"]);
  console.log("Todos data:", todosData);
};
