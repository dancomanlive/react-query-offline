import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export const useNetworkState = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      // console.log("Details", state.details);
      // console.log("Internet", state.isInternetReachable);
      // console.log("Wifi Enabled", state.isWifiEnabled);
      // Check if the connection type is 'wifi', you can check for other types as well
      const onWifi = state.type === "wifi";
      const connected = state.isConnected && onWifi;

      setIsConnected(connected);
    });

    return () => {
      // Clean up the subscription on unmount
      unsubscribe();
    };
  }, []);

  return isConnected;
};
