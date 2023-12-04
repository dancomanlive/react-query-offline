import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/CustomButton.styles";

// Interface defining the props for CustomButton.
interface CustomButtonProps {
  title: string; // Text to be displayed on the button.
  onPress: () => void; // Function to execute when the button is pressed.
  isCompleted?: boolean; // Optional prop to indicate if the todo item is completed.
}

// CustomButton component to render a styled button.
export default function CustomButton({ title, onPress, isCompleted }: CustomButtonProps) {
  return (
    <TouchableOpacity
      /* Apply the base button style. If isCompleted is true, apply the 'completed' style too. */
      style={[styles.button, isCompleted ? styles.completed : null]}
      onPress={onPress} // Set the function to call on button press.
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
