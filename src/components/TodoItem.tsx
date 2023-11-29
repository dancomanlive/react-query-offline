import React from "react";
import { Text, View } from "react-native";
import useTodoItemActions from "../hooks/useTodoItemActions";
import { Todo } from "../shared-types";
import { styles } from "../styles/TodoItem.styles";
import EditTodoView from "./EditTodo";
import ViewTodo from "./ViewTodo";

// Props type definition for the TodoItem component.
interface TodoItemProps {
  todo: Todo; // The todo item to be displayed or edited.
}

// TodoItem component responsible for rendering a single todo item.
export default function TodoItem({ todo }: TodoItemProps) {
  // Custom hook that manages the state and actions for a todo item.
  // This includes the editable state of the todo, the current text being edited, and the action handlers.
  const {
    editText,
    setEditText,
    isEditing,
    handleSave,
    handleComplete,
    toggleEdit,
    handleDeleteTodo,
    updateStatus,
  } = useTodoItemActions({ todo });

  const renderUpdateStatus = () => {
    if (updateStatus.isPending) {
      return "Update is pending... ";
    }
    if (updateStatus.isPaused) {
      return "Update is paused ";
    }
    if (updateStatus.isSuccess) {
      return "Update is successful! ";
    }
    if (updateStatus.isError) {
      return `Error: ${updateStatus.error ? `${updateStatus.error.message} ` : "Unknown error"}`;
    }
    return "No status to display ";
  };

  return (
    <View style={styles.todoItem}>
      <Text style={{ color: "purple", fontStyle: "italic" }}>{renderUpdateStatus()}</Text>

      {/* Conditional rendering based on whether the todo item is being edited or not. */}
      {isEditing ? (
        // Edit mode: renders the EditTodoView component which provides an input for editing the todo's text
        // and buttons for saving or canceling the edit operation.
        <EditTodoView
          editText={editText}
          setEditText={setEditText}
          handleSave={handleSave}
          toggleEdit={toggleEdit}
        />
      ) : (
        // View mode: renders the ViewTodo component which displays the todo's text
        // and provides buttons for deleting, completing, or editing the todo.
        <ViewTodo
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleComplete={handleComplete}
          toggleEdit={toggleEdit}
        />
      )}
    </View>
  );
}
