// src/components/TodoItem.tsx
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { TodoUpdateInput } from "../types";

type TodoItemProps = {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  updateTodo: (todoUpdate: TodoUpdateInput) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, updateTodo }) => {
  const [editText, setEditText] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    updateTodo({
      id: todo.id,
      text: editText,
      completed: todo.completed, // Keep the completed status unchanged
    });
    setIsEditing(false); // Exit editing mode after saving
  };

  const handleComplete = () => {
    updateTodo({
      id: todo.id,
      completed: !todo.completed, // Toggle the completed status
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setEditText(todo.text); // Reset text to current todo text when toggling edit mode
  };

  return (
    <View style={styles.todoItem}>
      {isEditing ? (
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
