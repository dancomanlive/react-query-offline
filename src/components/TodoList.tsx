// src/components/TodoList.tsx
import React from "react";
import { FlatList, Text, View } from "react-native";
import { useTodo } from "../hooks/useTodo";
import { TodoItem } from "./TodoItem";

export default function TodoList() {
  const { todos, isFetching, updateTodo } = useTodo();
  console.log("🚀 ~ file: TodoList.tsx:9 ~ TodoList ~ isFetching:", isFetching);

  if (isFetching) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ top: 100 }}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TodoItem todo={item} updateTodo={updateTodo} />}
      />
    </View>
  );
}
