import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "lightblue",
  },
  clearContainer: {
    flex: 4,
  },
  clearPosition: {
    alignSelf: "flex-start",
  },
});
