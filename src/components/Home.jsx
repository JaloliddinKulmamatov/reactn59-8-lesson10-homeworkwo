import React, { useState, useEffect, useContext } from "react";
import { Table, Carousel, Pagination } from "flowbite-react";
import { Link } from "react-router-dom";
import { MyContext } from "./MyContext";
import { IoMdEye } from "react-icons/io";
import debounce from "lodash.debounce";

const PAGE_SIZE = 10;

function Home() {
  const [search, setSearch] = useState("");
  const { selectedCoins, setSelectedCoins, selectedValue } =
    useContext(MyContext);
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const currency =
          selectedValue === "jpy"
            ? "jpy"
            : selectedValue === "eur"
            ? "eur"
            : "usd";
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch coins");
        }
        if (response.status == 429 ) {
          alert("Error 429. Too mush request, out of limit!")
        }
        const data = await response.json();
        setCoins(data);
        localStorage.setItem("cachedCoins", JSON.stringify(data));
        localStorage.setItem("cacheTime", new Date().getTime().toString());
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    }

    fetchCoins();
  }, [selectedValue]); 

  const handleSearchChange = debounce((e) => {
    setSearch(e.target.value);
  }, 300);

  const filteredCoins = coins.filter((coin) =>
    search.toLowerCase() === ""
      ? true
      : coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const chunkProducts = (coins, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < coins.length; i += chunkSize) {
      chunks.push(coins.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const productChunks = chunkProducts(selectedCoins, 4);

  const handleSelectCoin = (coin) => {
    const isSelected = selectedCoins.some(
      (selected) => selected.id === coin.id
    );

    const updatedCoins = isSelected
      ? selectedCoins.filter((selected) => selected.id !== coin.id)
      : [...selectedCoins, coin];

    setSelectedCoins(updatedCoins);
  };

  const paginatedCoins = filteredCoins.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="p-8 bg-black min-h-screen">
      <h1 className="text-white text-3xl">
        Selected {selectedValue.toUpperCase()}
      </h1>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mb-40">
        <h1 className="text-center text-6xl font-bold mb-8 text-cyan-200">
          CRYPTOFOLIO WATCH LIST
        </h1>
        <p className="font-medium text-stone-400 text-center mb-11">
          Get all the Info regarding your favorite Crypto Currency
        </p>

        <Carousel className="bg-gray-900 relative z-20">
          {productChunks.map((coins, index) => (
            <div key={index} className="grid grid-cols-4 gap-4">
              {coins.map((coin) => (
                <div
                  key={coin.id}
                  className="flex flex-col items-center justify-center space-y-2"
                >
                  <img
                    className="w-24 h-16 object-contain"
                    src={coin.image}
                    alt={`${coin.name} logo`}
                  />
                  <span>
                    <Link
                      to={`/coin/${coin.id}`}
                      className="text-xl font-medium hover:text-gray-300 text-white"
                    >
                      {coin.symbol.toUpperCase()}
                    </Link>
                  </span>
                  <p className="text-sm text-gray-300">
                    {coin.current_price.toLocaleString()}{" "}
                    {selectedValue.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search for a coin..."
          onChange={handleSearchChange}
          className="p-2 w-full max-w-md rounded-lg bg-black"
        />
      </div>

      <Table className="w-full text-sm text-left text-gray-300 shadow-md">
        <Table.Head className="bg-gray-800 text-white uppercase">
          <Table.HeadCell className="bg-gray-800">Coin</Table.HeadCell>
          <Table.HeadCell className="bg-gray-800"></Table.HeadCell>
          <Table.HeadCell className="bg-gray-800">Price</Table.HeadCell>
          <Table.HeadCell className="bg-gray-800"></Table.HeadCell>
          <Table.HeadCell className="bg-gray-800">
            24h Price Change
          </Table.HeadCell>
          <Table.HeadCell className="bg-gray-800">Market Cap</Table.HeadCell>
        </Table.Head>
        <Table.Body className="bg-gray-900">
          {paginatedCoins.map((coin) => (
            <Table.Row
              key={coin.id}
              className="hover:bg-gray-700 transition duration-200"
            >
              <Table.Cell className="px-6 py-4">
                <img
                  src={coin.image}
                  alt={`${coin.name} logo`}
                  className="w-10 h-10 object-contain"
                />
              </Table.Cell>
              <Table.Cell className="px-6 py-4 font-medium text-white">
                <Link
                  to={`/coin/${coin.id}`}
                  className="hover:text-gray-500 text-xl"
                >
                  {coin.symbol.toUpperCase()}
                </Link>
                <p>{coin.name}</p>
              </Table.Cell>
              <Table.Cell className="px-6 py-4">
                {coin.current_price.toLocaleString()}{" "}
                {selectedValue.toUpperCase()}
              </Table.Cell>
              <Table.Cell className="px-6 py-4">
                <button
                  onClick={() => handleSelectCoin(coin)}
                  className={`text-white px-3 py-1 rounded-full ${
                    selectedCoins.some((selected) => selected.id === coin.id)
                      ? "bg-gray-700"
                      : "bg-green-500"
                  }`}
                >
                  <IoMdEye />
                </button>
              </Table.Cell>
              <Table.Cell
                className={`px-6 py-4 ${
                  coin.price_change_24h > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {coin.price_change_24h.toLocaleString()}{" "}
                {selectedValue.toUpperCase()}
              </Table.Cell>

              <Table.Cell className="px-6 py-4">
                {coin.market_cap.toLocaleString()} {selectedValue.toUpperCase()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <div className="flex justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredCoins.length / PAGE_SIZE)}
          onPageChange={onPageChange}
          className="flex space-x-2"
        />
      </div>
    </div>
  );
}

export default Home;
