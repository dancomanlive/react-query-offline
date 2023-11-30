interface Props {
  isSuccess: boolean;
  isError: boolean;
  isPaused: boolean;
  isPending: boolean;
  error: Error;
}

export const renderUpdateStatus = (updateTodoMutationStatus: Props) => {
  if (updateTodoMutationStatus.isPending) {
    return "Update is pending... ";
  }
  if (updateTodoMutationStatus.isPaused) {
    return "Update is paused ";
  }
  if (updateTodoMutationStatus.isSuccess) {
    return "Update is successful! ";
  }
  if (updateTodoMutationStatus.isError) {
    return `Error: ${
      updateTodoMutationStatus.error
        ? `${updateTodoMutationStatus.error.message} `
        : "Unknown error"
    }`;
  }
  return "No status to display  ";
};
