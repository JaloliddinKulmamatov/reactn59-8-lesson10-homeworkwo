import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CoinDetails from "./components/Country"; // Corrected name

function App() {
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

  const updateSelectedCoins = (coins) => {
    setSelectedCoins(coins);
    try {
      localStorage.setItem("selectedCoins", JSON.stringify(coins));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                selectedCoins={selectedCoins}
                setSelectedCoins={setSelectedCoins}
                updateSelectedCoins={updateSelectedCoins}
              />
            }
          />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
