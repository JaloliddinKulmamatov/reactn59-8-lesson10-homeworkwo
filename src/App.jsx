import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header"
import CoinDetails from "./components/Country";
import { MyContext } from "./components/MyContext";
import Loading from "./components/Loading";


function App() {
  const [loading, setLoading] = useState(true);

 setTimeout(() => {
          setLoading(false);
        }, 2000);
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Router>
        <div className="App  ">
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Home loading={loading} setLoading={setLoading} />}
            />
            <Route path="/coin/:id" element={<CoinDetails />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
