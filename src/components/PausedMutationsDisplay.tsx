// src/components/PausedMutationsDisplay.tsx
import { useIsMutating } from "@tanstack/react-query";
import React from "react";
import { Text, View } from "react-native";

export default function PausedMutationsDisplay() {
  const isMutating = useIsMutating();

  return (
    <View>
      {isMutating > 0 && <Text>Changes are pending...</Text>}
      {/* Display more details about mutations if needed */}
    </View>
  );
}
