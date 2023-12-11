import { Feather } from "@expo/vector-icons";
import { useIsMutating, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useNetworkState } from "../hooks/useNetworkState";
import useTodoActions from "../hooks/useTodoActions";
import { todosQueryOptions } from "../query-options/todosQueryOptions";
import { styles } from "../styles/TodoList.styles";
import { Todo } from "../types";
import CustomButton from "./CustomButton";
import MutationsList from "./MutationList";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const isMutating = useIsMutating();
  const queryClient = useQueryClient();
  const mutationCache = queryClient.getMutationCache();
  const mutations = mutationCache.getAll();

  // Retrieves the list of todos and the fetching status from the useTodo hook.
  const { data: todos } = useQuery<Todo[], Error>(todosQueryOptions);

  const [_, setCacheCleared] = useState(false);

  // Utilizes the useTodoActions hook for managing adding todo actions.
  const {
    isAdding,
    newTodoText,
    setIsAdding,
    setNewTodoText,
    handleAddPress,
    handleSubmitEditing,
  } = useTodoActions();

  // Retrieves the network state (online or offline) from the useNetworkState hook.
  const isConnected = useNetworkState();

  // The function `clearMutationsCache` clears the mutation cache and updates the state of `cacheCleared`.
  const clearMutationsCache = () => {
    mutationCache.clear();
    setCacheCleared((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>
          {isConnected ? (
            <>
              <Feather name="wifi" size={34} color="green" />
              <Text> You are online.</Text>
            </>
          ) : (
            <>
              <Feather name="wifi-off" size={34} color="red" />
              <Text> You are offline.</Text>
            </>
          )}
        </Text>
        {isMutating > 0 && <Text>Mutations in progress: {isMutating}</Text>}
        {/* Conditionally renders the add todo input or the add button based on the isAdding state. */}
        {isAdding ? (
          <TodoInput
            newTodoText={newTodoText}
            setNewTodoText={setNewTodoText}
            handleSubmitEditing={handleSubmitEditing}
            onIconPress={() => setIsAdding(false)}
          />
        ) : (
          <CustomButton title="Add Todo" onPress={handleAddPress} />
        )}
      </View>
      {/* Renders a list of TodoItems. Each item is passed to the TodoItem component. */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TodoItem todo={item} />}
      />

      <View style={styles.clearContainer}>
        {mutations.length > 0 && (
          <View style={styles.clearPosition}>
            <Button onPress={clearMutationsCache} title="Clear Mutations Cache" />
          </View>
        )}
        <MutationsList mutations={mutations} />
      </View>
    </View>
  );
}
