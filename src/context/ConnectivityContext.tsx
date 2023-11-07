// src/contexts/ConnectivityContext.tsx

import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface ConnectivityContextProps {
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
}

interface ConnectivityProviderProps {
  children: ReactNode; // Use ReactNode for children as it can be anything renderable.
}

// Create a context with a default value.
export const ConnectivityContext = createContext<ConnectivityContextProps>({
  isConnected: false,
  setIsConnected: (value: boolean) => {},
});

// Component to provide the context value
export const ConnectivityProvider: React.FC<ConnectivityProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Subscribe to connectivity changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected = !!state.isConnected;
      onlineManager.setOnline(connected);
      setIsConnected(connected);
    });

    // Unsubscribe on cleanup
    return () => {
      unsubscribe();
    };
  }, []);

  // Provide the current connectivity status and a method to update it
  return (
    <ConnectivityContext.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </ConnectivityContext.Provider>
  );
};

// Hook to use the connectivity status in a component
export const useConnectivity = () => {
  return useContext(ConnectivityContext);
};
