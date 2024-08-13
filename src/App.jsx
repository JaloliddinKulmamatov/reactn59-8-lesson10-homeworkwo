import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header"
import CoinDetails from "./components/Country";
import { MyContext } from "./components/MyContext";

function App() {
  const { selectedCoins, setSelectedCoins } = useContext(MyContext);

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
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home updateSelectedCoins={updateSelectedCoins} />}
          />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
