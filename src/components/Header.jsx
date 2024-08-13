import { useContext } from "react";
import React from "react";
import DrawerComponent from "./Drawer";
import { MyContext } from "./MyContext";

function Header() {
    const { selectedCoins } = useContext(MyContext);

  return (
    <div className="bg-blue-50 py-4">
      <div className="flex justify-between items-center px-8 bg-white shadow-md rounded-lg p-4">
        <a
          href="/"
          className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition-colors"
        >
          LOGO
        </a>
        <DrawerComponent/>
      </div>
    </div>
  );
}

export default Header;
