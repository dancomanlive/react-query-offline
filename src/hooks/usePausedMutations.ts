import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { TodoUpdateInput } from "../types"; // Assuming this is the correct path for your type definition
import { useTodo } from "./useTodo";

// usePausedMutations hook definition.
// This hook manages the paused mutation state and their execution when online.
export function usePausedMutations() {
  // State variable to keep track of mutations that are paused due to no network access.
  const [pausedMutations, setPausedMutations] = useState<TodoUpdateInput[]>([]);
  // Retrieves the update function from useTodo to be used for mutation execution.
  const { updateTodo } = useTodo();

  // Function to process and attempt retrying mutations when the device is connected to the internet.
  const tryMutationsWhenOnline = async (connected: boolean) => {
    if (connected) {
      // Initial retrieval of paused mutations from AsyncStorage when network status changes to online.
      const storedMutationsString = await AsyncStorage.getItem("pausedMutations");
      // Parsing stored mutations or defaulting to an empty array if none are found.
      const storedMutations = storedMutationsString ? JSON.parse(storedMutationsString) : [];

      // A fresh copy of stored mutations to track changes as mutations are processed.
      let updatedPausedMutations = storedMutations;

      // Iterating over stored mutations to attempt updating todos.
      for (const mutationData of storedMutations) {
        try {
          // Attempt the update mutation and wait for it to complete.
          await updateTodo(mutationData);
          // On successful update, remove the mutation from the updated array.
          updatedPausedMutations = updatedPausedMutations.filter((m) => m.id !== mutationData.id);
        } catch (error) {
          // Log any errors during mutation processing.
          console.error("Failed to update todo:", mutationData.id, error);
          // Failed mutations remain in the updated array to be retried later.
        }
      }

      // Update state with any remaining paused mutations after processing and persist them to AsyncStorage.
      setPausedMutations(updatedPausedMutations);
      await AsyncStorage.setItem("pausedMutations", JSON.stringify(updatedPausedMutations));
    }
  };

  // Effect hook to set up the listener for network connectivity changes on component mount.
  useEffect(() => {
    // Define a function to load the initial paused mutations state from AsyncStorage when the app starts.
    const loadPausedMutations = async () => {
      // Retrieve stored paused mutations from AsyncStorage.
      const storedMutationsString = await AsyncStorage.getItem("pausedMutations");
      // Parse and set the paused mutations state with retrieved data or default to an empty array.
      const storedMutations = storedMutationsString ? JSON.parse(storedMutationsString) : [];
      setPausedMutations(storedMutations);
    };

    // Execute the loading function defined above to initialize the paused mutations state.
    loadPausedMutations();

    // Subscribe to network connectivity changes to handle paused mutations accordingly.
    const unsubscribe = NetInfo.addEventListener((state) => {
      tryMutationsWhenOnline(state.isConnected ?? false);
    });

    // Cleanup function to remove the event listener when the component is unmounted.
    return () => unsubscribe();
  }, []);

  // Return paused mutations state for potential use in component rendering.
  return { pausedMutations };
}
