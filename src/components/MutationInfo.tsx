import { Mutation } from "@tanstack/react-query";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/MutationInfo.styles";
import { MutationStateContext, Todo } from "../types";
import { formatDate } from "../utils/formatDate";
import { getStatusColor } from "../utils/getStatusColor";

interface MutationInfoProps {
  mutation: Mutation;
}

export default function MutationInfo({ mutation }: MutationInfoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mutation Information</Text>
      <Text>Mutation ID: {mutation.mutationId}</Text>
      <Text style={{ color: getStatusColor(mutation.state.status) }}>
        Status: {mutation.state.status}
      </Text>
      <Text>Submitted At: {formatDate(mutation.state.submittedAt)}</Text>
      <Text>Failure Count: {mutation.state.failureCount}</Text>

      {mutation.state.error && (
        <Text style={styles.error}>Error: {mutation.state.error.message}</Text>
      )}

      <Text style={styles.subtitle}>Current Todo</Text>
      <Text>ID: {(mutation.state.data as Todo)?.id}</Text>
      <Text>Text: {(mutation.state.data as Todo)?.text}</Text>
      <Text>Completed: {(mutation.state.data as Todo)?.completed ? "Yes" : "No"}</Text>

      <Text style={styles.subtitle}>Previous Todos</Text>
      {(mutation.state.context as MutationStateContext).previousTodos?.map((todo: Todo) => (
        <View key={todo.id}>
          <Text>ID: {todo.id}</Text>
          <Text>Text: {todo.text}</Text>
          <Text>Completed: {todo.completed ? "Yes" : "No"}</Text>
        </View>
      ))}
    </View>
  );
}
