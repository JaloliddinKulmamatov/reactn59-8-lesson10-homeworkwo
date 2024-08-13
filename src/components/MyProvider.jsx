import React, { useState, useEffect } from "react";
import { MyContext } from "./MyContext"; 

function MyProvider({ children }) {
  const [selectedCoins, setSelectedCoins] = useState(() => {
    const storedCoins = localStorage.getItem("selectedCoins");
    return storedCoins ? JSON.parse(storedCoins) : [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("selectedCoins", JSON.stringify(selectedCoins));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [selectedCoins]);

  return (
    <MyContext.Provider value={{ selectedCoins, setSelectedCoins }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyProvider;
