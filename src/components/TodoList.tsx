// src/components/TodoList.tsx
import { onlineManager } from "@tanstack/react-query";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { usePausedMutations } from "../hooks/usePausedMutations"; // Custom hook to manage paused mutations
import { useTodo } from "../hooks/useTodo"; // Custom hook to manage todo fetching and state
import { TodoItem } from "./TodoItem"; // Component for rendering individual todo items

// The main component for rendering the list of todos
export default function TodoList() {
  // Destructuring todos, fetching state, and the update function from the useTodo hook
  const { todos, isFetching, updateTodo } = useTodo();
  const isOnline = onlineManager.isOnline(); // Checking network status
  const { pausedMutations } = usePausedMutations(); // Retrieve paused mutations from the custom hook
  // Logging paused mutations to the console for debugging purposes
  console.log("🚀 ~ file: TodoList.tsx:13 ~ TodoList ~ pausedMutations:", pausedMutations);

  // Conditional rendering based on the fetching state of the todos
  if (isFetching) {
    return <Text>Loading...</Text>; // Display loading text if fetching is in progress
  }

  // The main view for the TodoList component
  return (
    <View style={{ top: 100 }}>
      <Text>{isOnline ? "You are online." : "You are offline."}</Text> // Display network status
      <FlatList
        data={todos} // Data source for FlatList is the list of todos
        keyExtractor={(item) => item.id.toString()} // Extracting keys for list items
        renderItem={({ item }) => <TodoItem todo={item} updateTodo={updateTodo} />} // Rendering TodoItem for each todo
      />
    </View>
  );
}
