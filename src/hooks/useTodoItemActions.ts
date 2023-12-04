import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { deleteTodoMutationOptions } from "../mutation-options/deleteTodoMutationOptions";
import { updateTodoMutationOptions } from "../mutation-options/updateTodoMutationOptions";
import { Todo } from "../types";

// Props interface for the useTodoItemActions hook.
interface useTodoItemActionsProps {
  todo: Todo; // The todo item for which actions are managed.
}

// Custom hook for managing actions and state related to individual todo items.
const useTodoItemActions = ({ todo }: useTodoItemActionsProps) => {
  // Extract mutation functions from the useTodo hook.
  const updateTodoMutation = useMutation(updateTodoMutationOptions());
  const deleteTodoMutation = useMutation(deleteTodoMutationOptions());
  // State for managing the editable text of the todo item.
  const [editText, setEditText] = useState(todo.text);

  // State to track whether the todo item is currently being edited.
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle saving the edited text of a todo item.
  // Calls the updateTodoMutation with updated text and then exits editing mode.
  const handleSave = () => {
    updateTodoMutation.mutate({
      id: todo.id,
      text: editText,
      completed: todo.completed, // Preserve the existing completion status.
    });
    setIsEditing(false);
  };

  // Function to handle toggling the completion status of a todo item.
  // It inverts the current completed status of the todo.
  const handleComplete = () => {
    updateTodoMutation.mutate({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  // Function to toggle the editing mode and reset the edit text.
  // If editing is turned off, the editText is reset to the todo's current text.
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setEditText(todo.text);
  };

  // Function to handle the deletion of a todo item.
  // Calls the deleteTodoMutation with the id of the todo item.
  const handleDeleteTodo = () => {
    deleteTodoMutation.mutate(todo.id);
  };

  // Exposing state and action handlers for use in components.
  return {
    editText,
    setEditText,
    isEditing,
    handleSave,
    handleComplete,
    toggleEdit,
    handleDeleteTodo,
  };
};

export default useTodoItemActions;
