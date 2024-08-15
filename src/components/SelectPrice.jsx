import React, { useContext } from "react";
import { MyContext } from "./MyContext";

function SelectPrice({ onSelectChange }) {
  const { selectedValue, setSelectedValue } = useContext(MyContext);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value); 
    onSelectChange(value); 
  };

  return (
    <div>
      <select
        className="border-none bg-transparent text-white"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
    </div>
  );
}

export { SelectPrice };
