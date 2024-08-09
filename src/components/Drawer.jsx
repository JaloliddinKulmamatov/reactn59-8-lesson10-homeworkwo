import React, { useState } from "react";
import { Button, Drawer } from "flowbite-react";

const DrawerComponent = ({ selectedCountries = [] }) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div >
        <Button onClick={() => setIsOpen(true)}>Show right drawer</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="Tanlangan davlatlar" />
        <Drawer.Items>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {selectedCountries.length > 0 ? (
              selectedCountries.map((country) => (
                <div key={country.name.common}>
                  <p>{country.name.common}</p>
                  <img
                    src={country.flags.svg}
                    alt={`${country.name.common} flag`}
                    width="30"
                  />
                </div>
              ))
            ) : (
              <p>Hech qanday davlat tanlanmagan.</p> // "No countries selected."
            )}
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
