import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { addTodoMutationOptions } from "../mutation-options/addTodoMutationOptions";

// useTodoActions is a custom hook for managing the state and actions related to adding a new todo item.
export default function useTodoActions() {
  // Extracts the addTodoMutation function from the useTodo hook.
  const addTodoMutation = useMutation(addTodoMutationOptions());

  // State to manage whether the add todo input is visible.
  const [isAdding, setIsAdding] = useState(false);

  // State to store the text of the new todo item.
  const [newTodoText, setNewTodoText] = useState("");

  // Function to handle the press event of the Add Todo button.
  // It sets isAdding to true, which will display the input field for adding a new todo.
  const handleAddPress = () => setIsAdding(true);

  // Function to handle the submit event of the input field.
  // It checks if the newTodoText is not empty, and if so, calls the addTodoMutation function with the new todo text.
  // After submitting, it resets the newTodoText to an empty string and sets isAdding to false to hide the input field.
  const handleSubmitEditing = () => {
    if (newTodoText.trim()) {
      addTodoMutation.mutate(newTodoText);
      setNewTodoText("");
    }
    setIsAdding(false);
  };

  // The hook returns the state variables and the action handlers so they can be used in components.
  return {
    isAdding,
    newTodoText,
    setIsAdding,
    setNewTodoText,
    handleAddPress,
    handleSubmitEditing,
  };
}
