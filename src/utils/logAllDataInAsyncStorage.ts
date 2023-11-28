import AsyncStorage from "@react-native-async-storage/async-storage";

export const logAllDataInAsyncStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log("All keys in AsyncStorage:", keys);

    // Fetch and log the data for each key
    for (const key of keys) {
      const value = await AsyncStorage.getItem(key);
      console.log(`Data for key ${key}:`, value);
    }
  } catch (error) {
    console.error("Error accessing AsyncStorage:", error);
  }
};
