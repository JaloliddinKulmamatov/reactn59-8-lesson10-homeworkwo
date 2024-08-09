import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import CountryDetails from "./components/Country";

function App() {
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    const storedCountries =
      JSON.parse(localStorage.getItem("selectedCountries")) || [];
    setSelectedCountries(storedCountries);
  }, []);

  const updateSelectedCountries = (countries) => {
    setSelectedCountries(countries);
    localStorage.setItem("selectedCountries", JSON.stringify(countries));
  };

  return (
    <Router>
      <div className="App">
        <Header selectedCountries={selectedCountries} />
        <Routes>
          <Route
            path="/"
            element={<Home updateSelectedCountries={updateSelectedCountries} />}
          />
          <Route path="/country/:countryName" element={<CountryDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
