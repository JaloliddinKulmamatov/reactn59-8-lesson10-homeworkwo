import React from "react";
import DrawerComponent from "./Drawer";

function Header({ selectedCountries }) {
  return (
    <div className="flex justify-center">
      <div className="max-w-[900px] flex gap-[600px] items-center p-12">
        
        <a href="/">LOGO</a>
        <DrawerComponent selectedCountries={selectedCountries} />
      </div>
    </div>
  );
}

export default Header;
