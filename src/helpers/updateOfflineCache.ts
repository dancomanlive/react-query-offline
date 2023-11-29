import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoUpdateInput } from "../shared-types";

interface Mutation {
  data: TodoUpdateInput;
  type: string;
  timestamp: number;
}

export const updateOfflineCache = async (mutation: Mutation) => {
  try {
    const cache = await AsyncStorage.getItem("pausedMutations");
    let parsedCache = cache ? JSON.parse(cache) : [];

    // Find the index of the existing item with the same ID
    const existingIndex = parsedCache.findIndex(
      (item: Mutation) => item.data.id === mutation.data.id
    );

    if (existingIndex !== -1) {
      // Item exists, overwrite it
      parsedCache[existingIndex] = mutation;
    } else {
      // Item doesn't exist, add it to the cache
      parsedCache.push(mutation);
    }

    // Save the updated cache back to AsyncStorage
    await AsyncStorage.setItem("pausedMutations", JSON.stringify(parsedCache));

    // Verification step: Re-fetch the cache to verify the update
    const updatedCache = await AsyncStorage.getItem("pausedMutations");
    const parsedUpdatedCache = updatedCache ? JSON.parse(updatedCache) : [];

    // Check if the update/addition was successful
    const isUpdated = parsedUpdatedCache.some(
      (item: Mutation) => item.data.id === mutation.data.id && item.type === mutation.type
    );

    if (isUpdated) {
      console.log("Update verified: Item was successfully saved.");
    } else {
      console.error("Verification failed: Item was not saved correctly.");
    }
  } catch (e) {
    console.error("Error updating and verifying offline cache:", e);
  }
};
