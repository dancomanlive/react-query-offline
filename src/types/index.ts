// src/types/index.ts
export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type TodoUpdateInput = {
  id: number;
  title?: string;
  completed?: boolean;
};
