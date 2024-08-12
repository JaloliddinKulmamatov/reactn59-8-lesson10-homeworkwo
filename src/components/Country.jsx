import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
    <div className="p-8 bg-blue-50 min-h-screen">
      <h1 className="text-center text-3xl font-bold mb-8">
        {coin.name} Details
      </h1>
      <div className="flex flex-col items-center space-y-4">
        <img
          src={coin.image.large}
          alt={`${coin.name} logo`}
          className="w-24 h-24"
        />
        <p className="text-xl">
          Current Price: ${coin.market_data.current_price.usd}
        </p>
        <p className="text-lg">
          Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
        </p>
        <p className="text-lg">
          24h Change: {coin.market_data.price_change_percentage_24h}%
        </p>
        <p className="text-lg">Rank: {coin.market_cap_rank}</p>
        <p className="text-md text-gray-600">{coin.description.en}</p>
      </div>
    </div>
  );
}

export default CoinDetails;
