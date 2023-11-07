// src/components/CacheClearer.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

// Function to clear all data from AsyncStorage
const clearAsyncStorage = async () => {
  // Retrieve all keys stored in AsyncStorage
  const asyncStorageKeys = await AsyncStorage.getAllKeys();
  // If there are keys present, clear the storage
  if (asyncStorageKeys.length > 0) {
    console.log("Clearing AsyncStorage...");
    AsyncStorage.clear();
  }
};

// Component to handle cache clearing within the app
const CacheClearer = () => {
  // Access the query client from the context
  const queryClient = useQueryClient();

  // Effect hook to perform side effects in the component
  useEffect(() => {
    // Log the clearing action
    console.log("Clearing cache...");
    // Call the function to clear AsyncStorage
    clearAsyncStorage();
    // Clear all queries from the query client's cache
    queryClient.clear();
  }, [queryClient]); // The effect depends on the queryClient instance

  // Render nothing since this component only performs side effects
  return null;
};

// Make the CacheClearer component available for import
export default CacheClearer;
