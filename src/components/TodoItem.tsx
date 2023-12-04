import React from "react";
import { View } from "react-native";
import useTodoItemActions from "../hooks/useTodoItemActions";
import { styles } from "../styles/TodoItem.styles";
import { Todo } from "../types";
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
  } = useTodoItemActions({ todo });

  return (
    <View style={styles.todoItem}>
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
