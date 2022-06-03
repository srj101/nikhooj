import React, { createContext, useState } from "react";

const GrabPostContext = createContext(undefined);
const GrabPostDispatchContext = createContext(undefined);

function GrabFormProvider({ children }) {
  const [grabDetails, setGrabDetails] = useState({
    name: "",
    postType: undefined,
    category: [],
    description: "",
    images: [],
    location: [23.8768944, 90.3179662],
    navEnabled: false,
    phone: "",
    address: "",
    step: 0,
    errors: [],
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
