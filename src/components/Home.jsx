import React, { useState, useEffect } from "react";
import { Table, Button, Carousel, Pagination } from "flowbite-react";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

function Home({ updateSelectedCountries }) {
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }

    fetchCountry();
  }, []);

  useEffect(() => {
    const storedCountries =
      JSON.parse(localStorage.getItem("selectedCountries")) || [];
    setSelectedCountries(storedCountries);
  }, []);

  const handleSelectCountry = (country) => {
    const isSelected = selectedCountries.some(
      (selected) => selected.name.common === country.name.common
    );

    let updatedCountries;
    if (isSelected) {
      updatedCountries = selectedCountries.filter(
        (selected) => selected.name.common !== country.name.common
      );
    } else {
      updatedCountries = [...selectedCountries, country];
    }

    setSelectedCountries(updatedCountries);
    updateSelectedCountries(updatedCountries);
  };

  const paginatedCountries = countries.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <h1 className="text-center text-2xl font-bold mb-8">
        Davlatlar ro'yxati
      </h1>
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel className="bg-blue-900 relative z-20mb-8">
        {selectedCountries.map((country) => (
          <div
            key={country.name.common}
            className="flex flex-col items-center justify-center space-y-2"
          >
            <img
              className="w-24 h-16 object-contain"
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
            />
            <Link
              to={`/country/${country.name.common.toLowerCase()}`}
              className="text-xl font-medium hover:text-blue-500"
            >
              {country.name.common}
            </Link>
            <p className="text-sm text-gray-700">
              {country.population.toLocaleString()} people
            </p>
          </div>
        ))}
      </Carousel>
      </div>

      <Table className="w-full text-sm text-left text-gray-700 shadow-md">
        <Table.Head className="bg-blue-500 text-white uppercase">
          <Table.HeadCell>Nomi</Table.HeadCell>
          <Table.HeadCell>Axolisi</Table.HeadCell>
          <Table.HeadCell>Poytaxti</Table.HeadCell>
          <Table.HeadCell>Bayrogi</Table.HeadCell>
          <Table.HeadCell>Tanlash</Table.HeadCell>
        </Table.Head>
        <Table.Body className="bg-white">
          {paginatedCountries.map((country) => (
            <Table.Row
              key={country.name.common}
              className="hover:bg-blue-100 transition duration-200"
            >
              <Table.Cell className="px-6 py-4 font-medium text-gray-900">
                <Link
                  to={`/country/${country.name.common.toLowerCase()}`}
                  className="hover:text-blue-500"
                >
                  {country.name.common}
                </Link>
              </Table.Cell>
              <Table.Cell className="px-6 py-4">
                {country.population.toLocaleString()}
              </Table.Cell>
              <Table.Cell className="px-6 py-4">{country.capital}</Table.Cell>
              <Table.Cell className="px-6 py-4">
                <img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  className="w-10 h-7 object-contain"
                />
              </Table.Cell>
              <Table.Cell className="px-6 py-4">
                <Button
                  onClick={() => handleSelectCountry(country)}
                  className={`text-white px-3 py-1 rounded-full ${
                    selectedCountries.some(
                      (selected) => selected.name.common === country.name.common
                    )
                      ? "bg-blue-700 hover:bg-blue-800"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {selectedCountries.some(
                    (selected) => selected.name.common === country.name.common
                  )
                    ? "Bekor qilish"
                    : "Tanlash"}
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <div className="flex justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(countries.length / PAGE_SIZE)}
          onPageChange={onPageChange}
          className="flex space-x-2"
        />
      </div>
    </div>
  );
}

export default Home;
