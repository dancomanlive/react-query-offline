import React from "react";
import { Text } from "react-native";
import { styles } from "../styles/ViewTodo.styles";
import { Todo } from "../types";
import CustomButton from "./CustomButton"; // Import the CustomButton component

// Interface defining the props for ViewTodo component.
interface ViewTodoProps {
  todo: Todo; // The todo item to display.
  handleDeleteTodo: () => void; // Function to call when the delete action is triggered.
  handleComplete: () => void; // Function to call when toggling the completion status.
  toggleEdit: () => void; // Function to call to switch to edit mode.
}

// ViewTodo component renders the view mode of a todo item.
export default function ViewTodo({
  todo,
  handleDeleteTodo,
  handleComplete,
  toggleEdit,
}: ViewTodoProps) {
  return (
    <>
      {/* Display the todo text. Style changes if the todo is completed. */}
      <Text style={[styles.todoText, todo.completed && styles.completedText]}>{todo.text}</Text>

      {/* Custom Button to switch to edit mode. */}
      <CustomButton title="Edit" onPress={toggleEdit} />

      {/* Custom Button to delete the todo item. */}
      <CustomButton title="Delete" onPress={handleDeleteTodo} />

      {/* Custom Button to toggle the completion status of the todo. */}
      <CustomButton
        title={todo.completed ? "Undo" : "Complete"}
        onPress={handleComplete}
        isCompleted={todo.completed}
      />
    </>
  );
}
