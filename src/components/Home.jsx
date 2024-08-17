import React, { useState, useEffect, useContext } from "react";
import { Table, Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import { MyContext } from "./MyContext";
import debounce from "lodash.debounce";
import DarkModeToggle from "./DarkMode";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
 import "react-toastify/dist/ReactToastify.css";
 import GreenEye from "../../public/icons8-eye-64.png";
 import RedEye from "../../public/icons8-eye-64-red.png";
import { Pagination } from "@mui/material";

const PAGE_SIZE = 10;

function Home() {
  const [search, setSearch] = useState("");
  const { selectedCoins, setSelectedCoins, selectedValue } =
    useContext(MyContext);
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
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
        setError(
          `${error.massage} or 429. Please wait 1 minute after try again`
        );
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
        <div
          className="h-56 sm:h-64 xl:h-80 2xl:h-96 mb-40"
          style={{ backgroundImage: `url('/bg.jpeg')` }}
        >
          <h1 className="text-center text-6xl font-bold mb-8 text-cyan-200">
            CRYPTOFOLIO WATCH LIST
          </h1>
          <p className="font-medium text-stone-400 text-center mb-11">
            Get all the Info regarding your favorite Crypto Currency
          </p>
          <Carousel
            className="bg-gray-200  relative z-20 mb-12"
            style={{ backgroundImage: `url('/bg.jpeg')` }}
            leftControl={
              <button className=" border-none ">
                <FaArrowLeft
                  style={{ width: "60px", height: "60px", color: "#0ad0f7" }}
                />
              </button>
            }
            rightControl={
              <button className="border-none">
                <FaArrowRight
                  style={{ width: "60px", height: "60px", color: "#0ad0f7" }}
                />
              </button>
            }
          >
            {productChunks.map((coins, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 max-w-screen-xl"
              >
                {coins.map((coin) => (
                  <div
                    key={coin.id}
                    className="flex flex-col items-center justify-center space-y-2"
                  >
                    <img
                      src={coin.image}
                      alt={`${coin.name} logo`}
                      className="w-24 h-24 mb-4"
                    />

                    <span className="flex items-center ">
                      <Link
                        to={`/coin/${coin.id}`}
                        className="text-xl font-medium  text-white  hover:text-gray-300"
                      >
                        {coin.symbol.toUpperCase()}
                      </Link>
                      <p
                        className={`px-6 py-4 ${
                          coin.price_change_percentage_24h > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {coin.price_change_percentage_24h.toFixed(2)}
                      </p>
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
        <div className=" max-w-screen-xl   mx-auto">
          <div className="mb-8">
            <h3 className="text-gray-900 dark:text-white flex justify-center text-3xl ">
              Cryptocurrency Prices by Market Cap
            </h3>
            <input
              type="text"
              placeholder="Search for a coin..."
              onChange={handleSearchChange}
              className="p-2 w-full rounded-lg bg-gray-200 dark:bg-black text-gray-900 dark:text-white mt-8"
            />
          </div>

          <Table className="w-full text-sm text-left text-gray-700 dark:text-gray-300 shadow-md   ">
            <Table.Head className="bg-gray-300 dark:bg-gray-800 text-gray-900  uppercase">
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
                <Table.Row
                  key={coin.id}
                  className="hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
                >
                  <Table.Cell className="px-6 py-4">
                    <img
                      src={coin.image}
                      alt={`${coin.name} logo`}
                      className="w-10 h-10 object-contain"
                    />
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    <Link
                      to={`/coin/${coin.id}`}
                      className="hover:text-gray-600 dark:hover:text-gray-500 text-xl"
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
                      className="text-white px-3 py-1 rounded-full"
                    >
                      {selectedCoins.some(
                        (selected) => selected.id === coin.id
                      ) ? (
                        <img src={GreenEye} alt="abc" />
                      ) : (
                        <img src={RedEye} alt="abc" />
                      )}
                    </button>
                  </Table.Cell>
                  <Table.Cell
                    className={`px-6 py-4 ${
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
                  <Table.Cell className="px-6 py-4">
                    {coin.market_cap.toLocaleString()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <div className="flex justify-center mt-8">
            <Pagination
              count={25}
              page={currentPage}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "rgba(135, 206, 235, 1)",
                },
              }}
              color="primary"
              variant="outlined"
              onChange={(e, page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
