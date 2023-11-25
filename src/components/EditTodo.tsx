import React from "react";
import { Button, TextInput } from "react-native";
import { styles } from "../styles/EditTodo.styles";

// Props type definition for EditTodoView component
interface EditTodoViewProps {
  editText: string; // Text for the todo item being edited
  setEditText: React.Dispatch<React.SetStateAction<string>>; // Function to update the editText
  handleSave: () => void; // Function to handle the save action
  toggleEdit: () => void; // Function to toggle the editing mode
}

// EditTodoView component for rendering the editable view of a todo item
export default function EditTodoView({
  editText,
  setEditText,
  handleSave,
  toggleEdit,
}: EditTodoViewProps) {
  return (
    <>
      {/* TextInput to edit the todo text */}
      <TextInput
        style={styles.todoInput}
        value={editText}
        onChangeText={setEditText} // Update the text as the user types
        placeholder="Edit Todo" // Placeholder text for the input field
      />
      {/* Save button to confirm the changes */}
      <Button title="Save" onPress={handleSave} />
      {/* Cancel button to revert to view mode without saving changes */}
      <Button title="Cancel" onPress={toggleEdit} />
    </>
  );
}
