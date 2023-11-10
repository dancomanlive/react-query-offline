// src/api/todoService.ts

import { jsonPlaceholderBaseURL } from "../constants/BaseUrl";
import { Todo, TodoUpdateInput } from "../types";

// Fetch all todos from the server
export async function getTodos(): Promise<Todo[]> {
  const userIdQuery = `?userId=1`;
  const response = await fetch(`${jsonPlaceholderBaseURL}/todos${userIdQuery}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// Update a todo item on the server
export async function updateTodo(todoUpdate: TodoUpdateInput): Promise<Todo> {
  const response = await fetch(`${jsonPlaceholderBaseURL}/posts/${todoUpdate.id}`, {
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
export async function addTodo(title: string = "Default Title", userId: number = 1): Promise<Todo> {
  const response = await fetch(`${jsonPlaceholderBaseURL}/todos`, {
    method: "POST",
    body: JSON.stringify({
      title,
      completed: false, // Default value for completed is set to false
      userId,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    throw new Error("Error adding new todo");
  }
  return response.json();
}
