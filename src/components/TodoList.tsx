// src/components/TodoList.tsx
import React from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useNetworkState } from "../hooks/useNetworkState";
import { usePausedMutations } from "../hooks/usePausedMutations"; // Custom hook to manage paused mutations
import { useTodo } from "../hooks/useTodo"; // Custom hook to manage todo fetching and state
import { TodoItem } from "./TodoItem"; // Component for rendering individual todo items

// The main component for rendering the list of todos
export default function TodoList() {
  // Destructuring todos, fetching state, and the update function from the useTodo hook
  const { todos, isFetching, updateTodo } = useTodo();
  console.log("🚀 ~ file: TodoList.tsx:13 ~ TodoList ~ todos:", todos);
  const isOnline = useNetworkState();
  const { pausedMutations } = usePausedMutations(); // Retrieve paused mutations from the custom hook
  // Logging paused mutations to the console for debugging purposes
  // console.log("🚀 ~ file: TodoList.tsx:13 ~ TodoList ~ pausedMutations:", pausedMutations);

  // Conditional rendering based on the fetching state of the todos
  if (isFetching) {
    return <Text>Loading...</Text>; // Display loading text if fetching is in progress
  }

  // The main view for the TodoList component
  return (
    <View style={{ top: 100 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          backgroundColor: "lightblue",
        }}
      >
        <Text>{isOnline ? "You are online." : "You are offline."}</Text>

        <Button
          onPress={() => {
            /* handle add todo */
          }}
          title="Add Todo"
        />
      </View>
      <FlatList
        data={todos} // Data source for FlatList is the list of todos
        keyExtractor={(item) => item.id.toString()} // Extracting keys for list items
        renderItem={({ item }) => <TodoItem todo={item} updateTodo={updateTodo} />} // Rendering TodoItem for each todo
      />
    </View>
  );
}
