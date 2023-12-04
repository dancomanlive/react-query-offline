// src/api/todoService.ts
import { Todo, TodoUpdateInput } from "../types";

// src/api/todoService.ts

// Updated base URL to point to the local server
const localBaseURL = process.env.EXPO_PUBLIC_BASE_URL_PRODUCTION;

// Fetch all todos from the server
export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${localBaseURL}/todos`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// Update a todo item on the server
export async function updateTodo(todoUpdate: TodoUpdateInput): Promise<Todo> {
  const response = await fetch(`${localBaseURL}/todos/${todoUpdate.id}`, {
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

// Add a todo item on the server
export async function addTodo(text: string = "Default Title"): Promise<Todo> {
  // Now add the new todo with this ID
  const response = await fetch(`${localBaseURL}/todos`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      text,
      completed: false, // Default value for completed is set to false
    }),
  });

  if (!response.ok) {
    throw new Error("Error adding new todo");
  }
  return response.json();
}

// Delete a todo item on the server
export async function deleteTodo(todoId: number): Promise<void> {
  const response = await fetch(`${localBaseURL}/todos/${todoId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting todo");
  }

  // You can return additional information if needed, for now, it's just a confirmation
  return;
}
