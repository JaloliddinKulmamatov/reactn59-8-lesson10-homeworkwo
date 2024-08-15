import React, { useContext } from "react"; // Make sure to import useContext
import DrawerComponent from "./Drawer";
import { SelectPrice } from "./SelectPrice";

function Header() {

  return (
    <div className="bg-black">
      <div className="flex justify-between items-center px-8 bg-gray-900 shadow-md p-4">
        <a
          href="/"
          className="text-2xl font-bold text-cyan-200 transition-colors"
        >
          CRYPTOFOLIO
        </a>
        <div className="flex items-center gap-9">
          <SelectPrice />

          <DrawerComponent />
        </div>
      </div>
    </div>
  );
}

export default Header;
