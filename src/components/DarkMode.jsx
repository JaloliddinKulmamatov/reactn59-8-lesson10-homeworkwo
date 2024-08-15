import React, { useState, useEffect } from "react";
import {  MdOutlineWbSunny } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";


const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved user preference
    const savedMode = localStorage.getItem("dark-mode") === "true";
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("dark-mode", !isDarkMode);
  };
return (
  <button
    onClick={toggleDarkMode}
    className="fixed z-40 w-12 h-10 right-0 top-50 p-2 bg-cyan-500 rounded-l-2xl"
  >
    {isDarkMode ? (
      <FaRegMoon style={{ width: "25px" }} />
    ) : (
      <MdOutlineWbSunny style={{ width: "25px" }} />
    )}
  </button>
);

};

export default DarkModeToggle;
