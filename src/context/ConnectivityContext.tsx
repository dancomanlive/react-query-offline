import { useNetInfo } from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface ConnectivityContextProps {
  isConnected: boolean;
}

const ConnectivityContext = createContext<ConnectivityContextProps>({ isConnected: false });

// Define a type for the props expected by the ConnectivityProvider component
type ConnectivityProviderProps = {
  children: ReactNode; // Explicitly type 'children' as ReactNode
};

export const ConnectivityProvider: React.FC<ConnectivityProviderProps> = ({ children }) => {
  const netInfo = useNetInfo();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Set the online status in react-query's onlineManager as well as in local state
    const connected = netInfo.isConnected ?? false;
    onlineManager.setOnline(connected);
    setIsConnected(connected);
  }, [netInfo.isConnected]); // Effect runs on change of netInfo.isConnected

  return (
    <ConnectivityContext.Provider value={{ isConnected }}>{children}</ConnectivityContext.Provider>
  );
};

export const useConnectivity = () => useContext(ConnectivityContext);
