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
