import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Mutation } from "../shared-types";

interface MutationInfoProps {
  mutation: Mutation;
}

const MutationInfo = ({ mutation }: MutationInfoProps) => {
  // Format the submittedAt date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const renderErrorMessage = () => {
    if (mutation.state.error) {
      return <Text style={styles.error}>Error: {mutation.state.error.message}</Text>;
    }
    return null;
  };

  const getStatusColor = () => {
    switch (mutation.state.status) {
      case "pending":
        return "purple";
      case "success":
        return "green";
      default:
        return "black"; // Default color for other statuses
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mutation Information</Text>
      <Text>Mutation ID: {mutation.mutationId}</Text>
      <Text style={{ color: getStatusColor() }}>Status: {mutation.state.status}</Text>
      <Text>Submitted At: {formatDate(mutation.state.submittedAt)}</Text>
      <Text>Failure Count: {mutation.state.failureCount}</Text>

      {renderErrorMessage()}

      <Text style={styles.subtitle}>Current Todo</Text>
      <Text>ID: {mutation.state.data?.id}</Text>
      <Text>Text: {mutation.state.data?.text}</Text>
      <Text>Completed: {mutation.state.data?.completed ? "Yes" : "No"}</Text>

      <Text style={styles.subtitle}>Previous Todos</Text>
      {mutation.state.context.previousTodos.map((todo) => (
        <View key={todo.id}>
          <Text>ID: {todo.id}</Text>
          <Text>Text: {todo.text}</Text>
          <Text>Completed: {todo.completed ? "Yes" : "No"}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  error: {
    color: "red",
  },
});

export default MutationInfo;
