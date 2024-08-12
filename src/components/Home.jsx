import React, { useState, useEffect } from "react";
import { Table, Button, Carousel, Pagination } from "flowbite-react";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

function Home({ selectedCoins, setSelectedCoins }) {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    const cachedCoins = JSON.parse(localStorage.getItem("cachedCoins"));
    const cacheTime = localStorage.getItem("cacheTime");
    const now = new Date().getTime();

    if (cachedCoins && cacheTime && now - cacheTime < 300000) {
      setCoins(cachedCoins);
    } else {
      async function fetchCoins() {
        try {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false"
          );
          if (!response.ok) {
            throw new Error("Failed to fetch coins");
          }
          const data = await response.json();
          setCoins(data);
          localStorage.setItem("cachedCoins", JSON.stringify(data));
          localStorage.setItem("cacheTime", now.toString());
        } catch (error) {
          console.error("Error fetching coins:", error);
        }
      }

      fetchCoins();
    }
  }, []);

  const handleSelectCoin = (coin) => {
    const isSelected = selectedCoins.some(
      (selected) => selected.id === coin.id
    );

    const updatedCoins = isSelected
      ? selectedCoins.filter((selected) => selected.id !== coin.id)
      : [...selectedCoins, coin];

    setSelectedCoins(updatedCoins);
  };

  const paginatedCoins = coins.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <h1 className="text-center text-2xl font-bold mb-8">
        Cryptocurrency List
      </h1>

      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mb-8">
        <Carousel className="bg-blue-900 relative z-20">
          {selectedCoins.map((coin) => (
            <div
              key={coin.id}
              className="flex flex-col items-center justify-center space-y-2"
            >
              <img
                className="w-24 h-16 object-contain"
                src={coin.image}
                alt={`${coin.name} logo`}
              />
              <Link
                to={`/coin/${coin.id}`}
                className="text-xl font-medium hover:text-white"
              >
                {coin.name}
              </Link>
              <p className="text-sm text-white">
                ${coin.current_price.toLocaleString()}
              </p>
            </div>
          ))}
        </Carousel>
      </div>

      <Table className="w-full text-sm text-left text-gray-700 shadow-md">
        <Table.Head className="bg-blue-500 text-white uppercase">
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Market Cap</Table.HeadCell>
          <Table.HeadCell>Current Price</Table.HeadCell>
          <Table.HeadCell>Logo</Table.HeadCell>
          <Table.HeadCell>Select</Table.HeadCell>
        </Table.Head>
        <Table.Body className="bg-white">
          {paginatedCoins.map((coin) => (
            <Table.Row
              key={coin.id}
              className="hover:bg-blue-100 transition duration-200"
            >
              <Table.Cell className="px-6 py-4 font-medium text-gray-900">
                <Link to={`/coin/${coin.id}`} className="hover:text-blue-500">
                  {coin.name}
                </Link>
              </Table.Cell>
              <Table.Cell className="px-6 py-4">
                ${coin.market_cap.toLocaleString()}
              </Table.Cell>
              <Table.Cell className="px-6 py-4">
                ${coin.current_price.toLocaleString()}
              </Table.Cell>
              <Table.Cell className="px-6 py-4">
                <img
                  src={coin.image}
                  alt={`${coin.name} logo`}
                  className="w-10 h-10 object-contain"
                />
              </Table.Cell>
              <Table.Cell className="px-6 py-4">
                <Button
                  onClick={() => handleSelectCoin(coin)}
                  className={`text-white px-3 py-1 rounded-full ${
                    selectedCoins.some((selected) => selected.id === coin.id)
                      ? "bg-blue-700 hover:bg-blue-800"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {selectedCoins.some((selected) => selected.id === coin.id)
                    ? "Deselect"
                    : "Select"}
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <div className="flex justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(coins.length / PAGE_SIZE)}
          onPageChange={onPageChange}
          className="flex space-x-2"
        />
      </div>
    </div>
  );
}

export default Home;
