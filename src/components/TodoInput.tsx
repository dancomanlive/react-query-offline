// TodoInput.tsx
import { Feather } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";
import { styles } from "../styles/TodoInput.styles";

// Interface defining the props for TodoInput.
interface TodoInputProps {
  newTodoText: string; // Current text in the todo input field.
  setNewTodoText: (text: string) => void; // Function to update the todo text.
  handleSubmitEditing: () => void; // Function to handle the submission of the todo.
  onIconPress: () => void; // Function to handle the press event of the icon.
}

export default function TodoInput({
  newTodoText,
  setNewTodoText,
  handleSubmitEditing,
  onIconPress,
}: TodoInputProps) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Enter todo text"
        value={newTodoText}
        onChangeText={setNewTodoText} // Updates the text in state on change
        onSubmitEditing={handleSubmitEditing} // Handles todo submission
        autoFocus // Automatically focus the input
        returnKeyType="done" // Sets the return key to 'done'
        style={styles.input} // Styling for the text input
      />
      <Feather
        name="x"
        size={24}
        color="black"
        onPress={() => {
          setNewTodoText(""); // Clears the text input when icon is pressed
          onIconPress(); // Calls the onIconPress function passed as prop
        }}
        style={styles.icon} // Styling for the icon
      />
    </View>
  );
}
