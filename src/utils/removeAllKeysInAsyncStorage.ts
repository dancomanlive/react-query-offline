import AsyncStorage from "@react-native-async-storage/async-storage";

const removeAllKeysInAsyncStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (keys.length > 0) {
      await AsyncStorage.multiRemove(keys);
      console.log("All keys removed from AsyncStorage");
    } else {
      console.log("No keys found in AsyncStorage to remove");
    }
  } catch (error) {
    console.error("Error removing keys from AsyncStorage:", error);
  }
};
