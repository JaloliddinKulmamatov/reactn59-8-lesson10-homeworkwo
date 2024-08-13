import React, { useState, useContext } from "react";
import { Button, Drawer } from "flowbite-react";
import { MyContext } from "./MyContext";

const DrawerComponent = () => {
  const { selectedCoins, setSelectedCoins } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);



  return (
    <>
      <div>
        <Button onClick={handleOpen}>Show right drawer</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="Selected Coins" />
        <Drawer.Items>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {selectedCoins.length > 0 ? (
              selectedCoins.map((coin) => (
                <div key={coin.id} className="flex items-center space-x-2">
                  <img
                    src={coin.image}
                    alt={`${coin.name} logo`}
                    width="30"
                    className="object-contain"
                  />
                  <p>{coin.name}</p>
                </div>
              ))
            ) : (
              <p>No coins selected.</p>
            )}
            <button
              onClick={() => setSelectedCoins([])}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Clear All
            </button>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
