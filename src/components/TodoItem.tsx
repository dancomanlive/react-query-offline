// src/components/TodoItem.tsx
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { TodoUpdateInput } from "../types"; // Importing type definitions for TodoUpdateInput

// Typing for props expected by the TodoItem component
type TodoItemProps = {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  updateTodo: (todoUpdate: TodoUpdateInput) => void; // Function type for updating a todo
};

// Functional component for individual todo items
export const TodoItem: React.FC<TodoItemProps> = ({ todo, updateTodo }) => {
  // State for the editable text field
  const [editText, setEditText] = useState(todo.text);
  // State to track if the todo item is being edited
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle saving the edited text
  const handleSave = () => {
    updateTodo({
      id: todo.id,
      text: editText,
      completed: todo.completed, // Maintain existing completion status
    });
    setIsEditing(false); // Exit editing mode upon save
  };

  // Function to handle toggling the completed status of a todo
  const handleComplete = () => {
    updateTodo({
      id: todo.id,
      completed: !todo.completed, // Toggle completion status
    });
  };

  // Function to toggle edit mode and reset edit text
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setEditText(todo.text); // Reset editText state to current todo's text when editing is toggled
  };

  // The UI of the todo item, conditionally showing either the edit view or the view mode
  return (
    <View style={styles.todoItem}>
      {isEditing ? (
        // Edit mode: TextInput and Save/Cancel buttons
        <>
          <TextInput
            style={styles.todoInput}
            value={editText}
            onChangeText={setEditText}
            placeholder="Edit Todo"
          />
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={toggleEdit} />
        </>
      ) : (
        // View mode: Todo text and Edit/Complete/Undo buttons
        <>
          <Text style={[styles.todoText, todo.completed && styles.completedText]}>{todo.text}</Text>
          <Button title="Edit" onPress={toggleEdit} />
          <Button title={todo.completed ? "Undo" : "Complete"} onPress={handleComplete} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  todoInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
    padding: 10,
    flex: 1,
  },
  todoText: {
    flex: 1,
    marginRight: 10,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "grey",
  },
});
