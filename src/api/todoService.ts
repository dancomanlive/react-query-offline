// src/api/todoService.ts

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

const API_URL = "http://localhost:3000/todos";

// Fetch all todos from the server
export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error fetching todos");
  }
  return response.json();
}

// Update a todo item on the server
export async function updateTodo(todoUpdate: TodoUpdateInput): Promise<Todo> {
  const response = await fetch(`${API_URL}/${todoUpdate.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoUpdate),
  });
  if (!response.ok) {
    throw new Error("Error updating todo");
  }
  return response.json();
}

// Add more service functions as needed for creating, deleting, etc.
