import React, { useState, useContext } from "react";
import { Drawer } from "flowbite-react";
import Swal from "sweetalert2";
import { MyContext } from "./MyContext";

const DrawerComponent = () => {
  const { selectedCoins, setSelectedCoins } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleRemoveCoin = (coinId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCoins = selectedCoins.filter((coin) => coin.id !== coinId);
        setSelectedCoins(updatedCoins);
        Swal.fire({
          title: "Deleted!",
          text: "The coin has been removed from your watchlist.",
          icon: "success",
        });
      }
    });
  };

const handleClearAll = () => {
  if (selectedCoins.length === 0) return; 

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      setSelectedCoins([]);
      Swal.fire({
        title: "Deleted!",
        text: "The coin has been removed from your watchlist.",
        icon: "success",
      });
    }
  });
};


  return (
    <>
      <div>
        <button
          className="bg-cyan-200 px-5 py-4 text-black rounded-sm"
          onClick={handleOpen}
        >
          Watch List
        </button>
      </div>

      <Drawer
        className="bg-gray-600 text-white"
        open={isOpen}
        onClose={handleClose}
        position="right"
      >
        <Drawer.Header title="WATCHLIST" />
        <Drawer.Items>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {selectedCoins.length > 0 ? (
              selectedCoins.map((coin) => (
                <div
                  key={coin.id}
                  className="bg-black p-5 flex flex-col items-center space-x-2 rounded-xl"
                >
                  <img
                    src={coin.image}
                    alt={`${coin.name} logo`}
                    className="object-contain"
                  />
                  <p>{coin.current_price.toLocaleString()}</p>
                  <button
                    onClick={() => handleRemoveCoin(coin.id)}
                    className="mt-4 px-4 py-2 bg-rose-600 text-white"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>No coins selected.</p>
            )}
          </div>
        </Drawer.Items>
        <button
          onClick={handleClearAll}
          className="mt-4 px-4 py-2 bg-rose-600 text-white"
        >
          Clear All
        </button>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
