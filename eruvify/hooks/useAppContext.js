import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppContextProvider({ children }) {
  // Existing state
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [distanceWalked, setDistanceWalked] = useState(0);
  const [hasStartedBefore, setHasStartedBefore] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  
  // Add progressPercent state
  const [progressPercent, setProgressPercent] = useState(0);
  
  // Other state variables...

  return (
    <AppContext.Provider value={{
      isStarted,
      setIsStarted,
      isFinished,
      setIsFinished,
      distanceWalked,
      setDistanceWalked,
      totalDistance: 0.7, // You might want to make this dynamic
      progressPercent,
      setProgressPercent, // Add this to the context value
      hasStartedBefore,
      setHasStartedBefore,
      isReporting,
      setIsReporting,
      // Other context values...
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}