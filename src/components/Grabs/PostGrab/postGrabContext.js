import React, { createContext, useState } from "react";

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const GrabPostContext = createContext(undefined);
const GrabPostDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function GrabFormProvider({ children }) {
  const [grabDetails, setGrabDetails] = useState({
    name: "",
    category: [],
    description: "",
    images: [],
    location: [],
    error: [],
    navEnabled: false,
    phone: "",
    address: "",
    step: 0,
  });

  return (
    <GrabPostContext.Provider value={grabDetails}>
      <GrabPostDispatchContext.Provider value={setGrabDetails}>
        {children}
      </GrabPostDispatchContext.Provider>
    </GrabPostContext.Provider>
  );
}

export { GrabFormProvider, GrabPostContext, GrabPostDispatchContext };
