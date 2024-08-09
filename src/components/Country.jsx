import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const CountryDetails = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountryData() {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch country data");
        }
        const data = await response.json();
        setCountry(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCountryData();
  }, [countryName]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  if (!country)
    return <div className="text-center py-4">Country not found</div>;

  return (
    <div className="flex flex-wrap p-6 bg-gray-100 min-h-screen">
      <div className="w-full md:w-1/3 flex-shrink-0 bg-white p-4 rounded-lg shadow-lg m-4">
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          className="w-full h-auto rounded-lg mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{country.name.common}</h1>
        <p className="text-lg text-gray-700 mb-2">
          Currency:{" "}
          {country.currencies[Object.keys(country.currencies)[0]].name}
        </p>
        <p className="text-lg text-gray-700">
          Population: {country.population.toLocaleString()}
        </p>
      </div>

    </div>
  );
};

export default CountryDetails;
