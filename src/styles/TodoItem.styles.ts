import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
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
