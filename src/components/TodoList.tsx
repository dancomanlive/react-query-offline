import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { useNetworkState } from "../hooks/useNetworkState";
import { useTodo } from "../hooks/useTodo";
import useTodoActions from "../hooks/useTodoActions";
import { styles } from "../styles/TodoList.styles";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const queryClient = useQueryClient();
  // queryClient.getQueryCache().subscribe((queryCacheNotifyEvent) => {
  //   if (!queryCacheNotifyEvent) {
  //     return;
  //   }

  //   console.log(JSON.stringify(queryCacheNotifyEvent, null, 2));
  // });

  // Retrieves the list of todos and the fetching status from the useTodo hook.
  const { todos, isFetching } = useTodo();

  // Retrieves the network state (online or offline) from the useNetworkState hook.
  const isOnline = useNetworkState();

  // Utilizes the useTodoActions hook for managing adding todo actions.
  const { isAdding, newTodoText, setNewTodoText, handleAddPress, handleSubmitEditing } =
    useTodoActions();

  // Displays a loading text when the todos are being fetched.
  // if (isFetching) {
  //   return <Text>Loading...</Text>;
  // }

  // Main view for the TodoList component.
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Displays network status (online/offline) */}
        <Text>{isOnline ? "You are online." : "You are offline."}</Text>

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
