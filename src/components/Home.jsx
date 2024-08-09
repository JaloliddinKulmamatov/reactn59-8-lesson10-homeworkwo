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
    <div>
      <div className="text-center text-2xl font-bold my-8">
        Davlatlar ro'yxati
      </div>

      <Carousel>
        {selectedCountries.map((country) => (
          <div key={country.name.common}>
            <img src={country.flags.svg} alt={`${country.name.common} flag`} />
            <Link to="/country/countryName">{country.name.common}</Link>
            <p>{country.population}</p>
          </div>
        ))}
      </Carousel>

      <Table>
        <Table.Head>
          <Table.HeadCell>Nomi</Table.HeadCell>
          <Table.HeadCell>Axolisi</Table.HeadCell>
          <Table.HeadCell>Poytaxti</Table.HeadCell>
          <Table.HeadCell>Bayrogi</Table.HeadCell>
          <Table.HeadCell>Tanlash</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {paginatedCountries.map((country) => (
            <Table.Row key={country.name.common}>
              <Table.Cell>
                <Link to={`/country/${country.name.common}`}>
                  {country.name.common}
                </Link>
              </Table.Cell>
              <Table.Cell>{country.population}</Table.Cell>
              <Table.Cell>{country.capital}</Table.Cell>
              <Table.Cell>
                <img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  width="30"
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() => handleSelectCountry(country)}
                  style={{
                    backgroundColor: selectedCountries.some(
                      (selected) => selected.name.common === country.name.common
                    )
                      ? "#f87171"
                      : "#6ee7b7",
                  }}
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

      <div className="flex justify-center my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(countries.length / PAGE_SIZE)}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default Home;
