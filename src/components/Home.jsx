import React, { useState, useEffect, useContext } from "react";
import { Table, Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import { MyContext } from "./MyContext";
import debounce from "lodash.debounce";
import DarkModeToggle from "./DarkMode";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import GreenEye from "../../public/icons8-eye-64.png";
import RedEye from "../../public/icons8-eye-64-red.png";
import { Pagination } from "@mui/material";
import { motion } from "framer-motion";

const PAGE_SIZE = 10;

function Home() {
  const [search, setSearch] = useState("");
  const { selectedCoins, setSelectedCoins, selectedValue } =
    useContext(MyContext);
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);

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

        const data = await response.json();
        setCoins(data);
        localStorage.setItem("cachedCoins", JSON.stringify(data));
        localStorage.setItem("cacheTime", new Date().getTime().toString());
      } catch (error) {
        setError(`${error.message} or 429. Please wait 1 minute and try again`);
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

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <DarkModeToggle />
      <div className="p-8 bg-white dark:bg-black min-h-screen">
        <motion.div
          className="relative h-56 sm:h-64 xl:h-80 2xl:h-96 mb-52"
          style={{ backgroundImage: `url('/bg.jpeg')` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-cyan-200">
            CRYPTOFOLIO WATCH LIST
          </h1>
          <p className="font-medium text-stone-400 text-center mb-6">
            Get all the Info regarding your favorite Crypto Currency
          </p>
          <Carousel
            className="bg-gray-200 relative z-20"
            style={{ backgroundImage: `url('/bg.jpeg')` }}
            leftControl={
              <motion.button
                className="border-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowLeft
                  style={{ width: "40px", height: "40px", color: "#0ad0f7" }}
                />
              </motion.button>
            }
            rightControl={
              <motion.button
                className="border-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowRight
                  style={{ width: "40px", height: "40px", color: "#0ad0f7" }}
                />
              </motion.button>
            }
          >
            {productChunks.map((coins, index) => (
              <motion.div
                key={index}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {coins.map((coin) => (
                  <motion.div
                    key={coin.id}
                    className="flex flex-col items-center justify-center space-y-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={coin.image}
                      alt={`${coin.name} logo`}
                      className="w-16 h-16 mb-2"
                    />
                    <span className="flex flex-col items-center text-center">
                      <Link
                        to={`/coin/${coin.id}`}
                        className="text-lg font-medium text-white hover:text-gray-300"
                      >
                        {coin.symbol.toUpperCase()}
                      </Link>
                      <p
                        className={`text-sm ${
                          coin.price_change_percentage_24h > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {coin.price_change_percentage_24h.toFixed(2)}
                      </p>
                    </span>
                    <p className="text-xs text-gray-300">
                      {coin.current_price.toLocaleString()}{" "}
                      {selectedValue.toUpperCase()}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </Carousel>
        </motion.div>

        <motion.div
          className="max-w-screen-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="mb-8">
            <h3 className="text-gray-900 dark:text-white text-2xl sm:text-3xl text-center">
              Cryptocurrency Prices by Market Cap
            </h3>
            <motion.input
              type="text"
              placeholder="Search for a coin..."
              onChange={handleSearchChange}
              className="p-2 w-full rounded-lg bg-gray-200 dark:bg-black text-gray-900 dark:text-white mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </div>

          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Table className="w-full text-sm text-left text-gray-700 dark:text-gray-300 shadow-md">
              <Table.Head className="bg-gray-300 dark:bg-gray-800 text-gray-900 uppercase">
                <Table.HeadCell className="bg-cyan-600 dark:bg-cyan-400 text-gray-900 py-6 rounded-none">
                  Coin
                </Table.HeadCell>
                <Table.HeadCell className="bg-cyan-600 dark:bg-cyan-400 text-gray-900 py-6"></Table.HeadCell>
                <Table.HeadCell className="bg-cyan-600 dark:bg-cyan-400 text-gray-900 py-6">
                  Price
                </Table.HeadCell>
                <Table.HeadCell className="bg-cyan-600 dark:bg-cyan-400 text-gray-900 py-6"></Table.HeadCell>
                <Table.HeadCell className="bg-cyan-600 dark:bg-cyan-400 text-gray-900 py-6">
                  24h Price Change
                </Table.HeadCell>
                <Table.HeadCell className="bg-cyan-600 dark:bg-cyan-400 text-gray-900 py-6">
                  Market Cap
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="bg-gray-100 dark:bg-gray-900">
                {paginatedCoins.map((coin) => (
                  <motion.tr
                    key={coin.id}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Table.Cell className="px-4 py-3 sm:px-6 sm:py-4">
                      <img
                        src={coin.image}
                        alt={`${coin.name} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    </Table.Cell>
                    <Table.Cell className="px-4 py-3 sm:px-6 sm:py-4 font-medium text-gray-900 dark:text-white">
                      <Link
                        to={`/coin/${coin.id}`}
                        className="hover:text-gray-600 dark:hover:text-gray-500 text-lg"
                      >
                        {coin.symbol.toUpperCase()}
                      </Link>
                      <p className="text-xs">{coin.name}</p>
                    </Table.Cell>
                    <Table.Cell className="px-4 py-3 sm:px-6 sm:py-4">
                      {coin.current_price.toLocaleString()}{" "}
                      {selectedValue.toUpperCase()}
                    </Table.Cell>
                    <Table.Cell className="px-4 py-3 sm:px-6 sm:py-4">
                      <button
                        onClick={() => handleSelectCoin(coin)}
                        className="text-white px-2 py-1 rounded-full"
                      >
                        {selectedCoins.some(
                          (selected) => selected.id === coin.id
                        ) ? (
                          <img src={GreenEye} alt="selected" />
                        ) : (
                          <img src={RedEye} alt="not selected" />
                        )}
                      </button>
                    </Table.Cell>
                    <Table.Cell
                      className={`px-4 py-3 sm:px-6 sm:py-4 ${
                        coin.price_change_percentage_24h > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h
                        .toFixed(2)
                        .toLocaleString()}
                      % {selectedValue.toUpperCase()}
                    </Table.Cell>
                    <Table.Cell className="px-4 py-3 sm:px-6 sm:py-4">
                      {coin.market_cap.toLocaleString()}
                    </Table.Cell>
                  </motion.tr>
                ))}
              </Table.Body>
            </Table>
          </motion.div>
          <div className="flex justify-center mt-4">
            <Pagination
              count={Math.ceil(filteredCoins.length / PAGE_SIZE)}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              color="primary"
              variant="outlined"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "rgba(135, 206, 235, 1)",
                },
              }}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Home;
