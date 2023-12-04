import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/MutationInfo.styles";
import { Mutation } from "../types";

interface MutationInfoProps {
  mutation: Mutation; // Prop for mutation data.
}

const MutationInfo = ({ mutation }: MutationInfoProps) => {
  // Function to format timestamp into a readable date and time.
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  // Renders error message if there's an error in the mutation.
  const renderErrorMessage = () => {
    if (mutation.state.error) {
      return <Text style={styles.error}>Error: {mutation.state.error.message}</Text>;
    }
    return null;
  };

  // Determines the color of the status text based on the mutation's status.
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
      {mutation.state.context?.previousTodos.map((todo) => (
        <View key={todo.id}>
          <Text>ID: {todo.id}</Text>
          <Text>Text: {todo.text}</Text>
          <Text>Completed: {todo.completed ? "Yes" : "No"}</Text>
        </View>
      ))}
    </View>
  );
};

export default MutationInfo;
