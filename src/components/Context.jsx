import React, { createContext, useState } from "react";

export const MyContext = createContext();
  const [selectedCoins, setSelectedCoins] = useState([]);

export const MyProvider = ({ children }) => {

  return (
    <MyContext.Provider value={{ selectedCoins, setSelectedCoins }}>
      {children}
    </MyContext.Provider>
  );
};
