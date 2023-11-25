import React from "react";
import { Button, Text } from "react-native";
import { Todo } from "../shared-types";
import { styles } from "../styles/ViewTodo.styles";

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

      {/* Button to switch to edit mode. */}
      <Button title="Edit" onPress={toggleEdit} />

      {/* Button to delete the todo item. */}
      <Button title="Delete" onPress={handleDeleteTodo} />

      {/* Button to toggle the completion status of the todo. */}
      <Button title={todo.completed ? "Undo" : "Complete"} onPress={handleComplete} />
    </>
  );
}
