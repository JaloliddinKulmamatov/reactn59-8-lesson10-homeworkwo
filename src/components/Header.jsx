import { useContext } from "react";
import React from "react";
import DrawerComponent from "./Drawer";
import { MyContext } from "./MyContext";

function Header() {
    const { selectedCoins } = useContext(MyContext);

  return (
    <div className="bg-black">
      <div className="flex justify-between items-center px-8 bg-gray-900 shadow-md  p-4">
        <a
          href="/"
          className="text-2xl font-bold  text-cyan-200	 transition-colors"
        >
          CRYPTOFOLIO
        </a>
        <DrawerComponent />
      </div>
    </div>
  );
}

export default Header;
