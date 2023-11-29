import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { todosQueryOptions } from "../helpers/todosQueryOptions";
import { useNetworkState } from "../hooks/useNetworkState";
import useTodoActions from "../hooks/useTodoActions";
import { Todo } from "../shared-types";
import { styles } from "../styles/TodoList.styles";
import TodoItem from "./TodoItem";

export default function TodoList() {
  // Retrieves the list of todos and the fetching status from the useTodo hook.
  const { data: todos } = useQuery<Todo[], Error>(todosQueryOptions);

  // Retrieves the network state (online or offline) from the useNetworkState hook.
  const isConnected = useNetworkState();

  // Utilizes the useTodoActions hook for managing adding todo actions.
  const { isAdding, newTodoText, setNewTodoText, handleAddPress, handleSubmitEditing } =
    useTodoActions();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{isConnected ? "You are online." : "You are offline."}</Text>

        {/* Conditionally renders the add todo input or the add button based on the isAdding state. */}
        {isAdding ? (
          <TextInput
            placeholder="Enter todo text"
            value={newTodoText}
            onChangeText={setNewTodoText}
            onSubmitEditing={handleSubmitEditing}
            autoFocus
            returnKeyType="done"
          />
        ) : (
          <Button onPress={handleAddPress} title="Add Todo" />
        )}
      </View>
      {/* Renders a list of TodoItems. Each item is passed to the TodoItem component. */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TodoItem todo={item} />}
      />
    </View>
  );
}
