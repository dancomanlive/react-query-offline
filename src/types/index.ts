// src/types/index.ts
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type TodoUpdateInput = {
  id: number;
  text?: string;
  completed?: boolean;
};

export interface MutationStateContext {
  previousTodos: Todo[];
}
export interface Mutation<
  TData = Todo,
  TError = Error,
  TVariables = void,
  TContext = MutationStateContext
> {
  mutationId: number;
  state: {
    context: TContext;
    data: TData;
    error: TError | null;
    failureCount: number;
    failureReason: string | null;
    isPaused: boolean;
    status: string;
    variables: TVariables;
    submittedAt: number;
  };
  options: {
    mutationKey: string[];
    retry: number;
    _defaulted: boolean;
  };
  gcTime: number;
}
