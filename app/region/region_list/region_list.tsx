

"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { IoMdAddCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import styles from "./regionList.module.css";

// Header Component
// const Header = ({ onSelectCapital, }: { onSelectCapital: (value: string) => void }) => {
  const Header = ({
    onSelectCapital,
    onSearch,
  }: {
    onSelectCapital: (value: string) => void;
    onSearch: (searchValue: string) => void;
  }) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");


  const handleButtonClick = () => {
    router.push("");
  };

  const handleDropdownSelect = (value: string) => {
    onSelectCapital(value); // Pass the selected value to the parent
    setShowDropdown(false);
  };
  const handleSearch = () => {
    onSearch(searchInput); // Pass the search input value to the parent
  };

  return (
    <header className={styles.header}>
      <h1>Countries</h1>
      <div className={styles.searchBar}>
        {/* <input type="text" placeholder="Search..." />
        <button onClick={handleButtonClick}> */}
          <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>
          Search
        </button>
        <button onClick={handleButtonClick}>
          {/* <IoMdAddCircle /> */}
        </button>
        <div className={styles.dropdown}>
          <button
            className={styles.dropdownButton}
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            Region
          </button>
          {showDropdown && (
            <ul className={styles.dropdownMenu}>
              <li onClick={() => handleDropdownSelect("1")}>Asia</li>
              <li onClick={() => handleDropdownSelect("2")}>Europe</li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

interface CardData {
  country_name: string;
  country_code: string;
  capital: string;
  time_zone: string;
  region_name: string;
  current_time: string;
}

const CountryList: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [country_code, setCountryCode] = useState<string>("");
  // const [region, setRegion] = useState<string>("");
  const [region, setCapital] = useState<string>("");

  const fetchData = useCallback(
    async (capitalValue = region,searchValue = search) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/country/list/${page}?search=${search}&country_code=${country_code}&region=${region}&capital=${capitalValue}`
        );
        if (response.data.success) {
          setCards(response.data.data.country);
          setError(null);
        } else {
          setError(response.data.message || "Unknown error occurred.");
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    },
    [page, search, country_code, region, ]
  );

  useEffect(() => {
    fetchData();
  }, [page, fetchData]);

  const handleCapitalSelect = (value: string) => {
    setCapital(value);
    fetchData(value); // Call the API immediately with the selected capital
  };

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue); // Update the search value
    fetchData(region, searchValue); // Trigger the API call with the updated search value
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <>
      <Header onSelectCapital={handleCapitalSelect}onSearch={handleSearch} />
      <div className={styles.container}>
        {cards.map((card) => (
          <Card
            key={card.country_name}
            id={card.country_name}
            country_name={card.country_name}
            country_code={card.country_code}
            capital={card.capital}
            time_zone={card.time_zone}
            current_time={card.current_time}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        <button className={styles.previous} onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <button className={styles.next} onClick={handleNextPage}>
          Next
        </button>
      </div>
    </>
  );
};

export default CountryList;
