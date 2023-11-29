import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useNetworkState = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    // This function will be called whenever the network state changes
    const handleConnectivityChange = (state: NetInfoState) => {
      const onWifi = state.type === "wifi";
      const connected = state.isConnected && onWifi;

      setIsConnected(connected);

      // Inform onlineManager about the connectivity change
      onlineManager.setOnline(connected === null ? false : connected);
    };

    // Set the listener for onlineManager
    onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        const connected = state.isConnected && state.type === "wifi";
        setOnline(connected === null ? false : connected);
      });
    });

    // Subscribe to network info changes
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      // Clean up the subscription on unmount
      unsubscribe();
    };
  }, []);

  return isConnected;
};
