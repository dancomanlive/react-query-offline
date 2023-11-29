import AsyncStorage from "@react-native-async-storage/async-storage";

export const removePausedMutations = async () => {
  try {
    await AsyncStorage.removeItem("pausedMutations");
    console.log("Paused mutations removed successfully.");
  } catch (e) {
    console.error("Error removing paused mutations:", e);
  }
};
