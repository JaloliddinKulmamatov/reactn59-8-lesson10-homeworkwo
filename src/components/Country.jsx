import React, { useState, useEffect } from "react";
import ChartBtns from "./ChartBtn";
import { useParams } from "react-router-dom";
import ApexChart from "./ApexChart";

function CoinDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCoinDetails() {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch the coin data");
        }
        const data = await response.json();
        setCoin(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCoinDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white">
      <div className="p-8 lg:w-1/3 bg-gray-900">
        <h1 className="text-4xl font-bold mb-4">{coin.name}</h1>
        <img
          src={coin.image.large}
          alt={`${coin.name} logo`}
          className="w-24 h-24 mb-4"
        />
        <p className="text-2xl mb-2">Rank: {coin.market_cap_rank}</p>
        <p className="text-xl mb-2">
          Current Price: $ {coin.market_data.current_price.usd.toLocaleString()}
        </p>
        <p className="text-xl mb-4">
          Market Cap: $ {coin.market_data.market_cap.usd.toLocaleString()}M
        </p>
        <p className="text-md text-gray-400">
          {coin.description.en.slice(0, 150)}...
        </p>
      </div>
      <div className="lg:w-2/3 p-8">
        <ApexChart />
        <ChartBtns />
      </div>
    </div>
  );
}

export default CoinDetails;
