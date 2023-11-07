import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { TodoUpdateInput } from "../types";
import { useTodo } from "./useTodo";

// usePausedMutations hook definition.
// This hook manages the paused mutation state and their execution when online.
export function usePausedMutations() {
  // State variable to keep track of mutations that are paused due to no network access.
  const [pausedMutations, setPausedMutations] = useState<TodoUpdateInput[]>([]);
  // Retrieves the update function from useTodo to be used for mutation execution.
  const { updateTodo } = useTodo();
  // Hook to access network state.
  const netInfo = useNetInfo();

  // Function to process and attempt retrying mutations when the device is connected to the internet.
  useEffect(() => {
    // This function is called when the network state updates to process mutations.
    const processMutations = async () => {
      if (netInfo.isConnected) {
        // Load the stored paused mutations at the beginning of the online check.
        const storedMutationsString = await AsyncStorage.getItem("pausedMutations");
        const storedMutations = storedMutationsString ? JSON.parse(storedMutationsString) : [];
        let updatedPausedMutations = [...storedMutations]; // Clone the array to avoid direct state mutation.

        for (const mutationData of storedMutations) {
          try {
            await updateTodo(mutationData);
            updatedPausedMutations = updatedPausedMutations.filter((m) => m.id !== mutationData.id);
          } catch (error) {
            console.error("Failed to update todo:", mutationData.id, error);
          }
        }

        // Save any mutations that are left (i.e., were not successful).
        setPausedMutations(updatedPausedMutations);
        await AsyncStorage.setItem("pausedMutations", JSON.stringify(updatedPausedMutations));
      }
    };

    // Invoke the mutation processing function if the network state indicates connectivity.
    processMutations();
  }, [netInfo.isConnected]); // Re-run the effect when the network connectivity state changes.

  // Load paused mutations from storage when the hook first mounts.
  useEffect(() => {
    const loadPausedMutations = async () => {
      const storedMutationsString = await AsyncStorage.getItem("pausedMutations");
      const storedMutations = storedMutationsString ? JSON.parse(storedMutationsString) : [];
      setPausedMutations(storedMutations);
    };

    loadPausedMutations();
  }, []);

  // Expose the paused mutations state for use within components.
  return { pausedMutations };
}
