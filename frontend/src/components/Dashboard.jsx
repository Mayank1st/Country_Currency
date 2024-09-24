"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
  Grid,
  Divider,
  Alert,
  AlertIcon,
  Button,
  Select,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { debounce } from "lodash";
import CountryDetailsCard from "./CountryDetailsCard";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [countryDetails, setCountryDetails] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const itemsPerPage = 6;
  const inputRef = useRef(null);

  // Fetch search history when the component mounts
  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const response = await axiosInstance.get("/user/getsearchhistory");
        const userSearchHistory = response.data.data.searchHistory;
        setSearchHistory(userSearchHistory);
      } catch (err) {
        console.error(err);
        setError("No search history found.");
      }
    };

    fetchSearchHistory();
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query) {
        try {
          const response = await axiosInstance.get(
            `https://restcountries.com/v3.1/currency/${query}`
          );

          const countriesWithCurrency = response.data.map((country) => {
            const currencyCode = Object.keys(country.currencies || {})[0];
            const flagUrl = country.flags.svg;

            return {
              name: country.name.common,
              capital: country.capital ? country.capital[0] : "N/A",
              languages: Object.values(country.languages || {}).join(", "),
              currency: currencyCode,
              flag: flagUrl,
            };
          });

          setCountryDetails(countriesWithCurrency);
          setError("");

          // Update search history after a successful search
          await axiosInstance.post("/user/addsearchhistory", {
            currencyCode: query,
          });

          // Optionally refetch search history after adding a new one
          const updatedHistory = await axiosInstance.get(
            "/user/getsearchhistory"
          );
          setSearchHistory(updatedHistory.data.data.searchHistory);
        } catch (err) {
          setError(
            "Error fetching country details. Please check the currency code."
          );
          setCountryDetails([]);
        }
      }
    }, 500),
    []
  );

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handlePageChange = (direction) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Fetch user's favorites when the component mounts
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get("/user/getfavorites");
        const userFavorites = response.data.data.favorites;
        setFavorites(userFavorites);
      } catch (err) {
        console.error(err);
        // setError("Error fetching favorites.");
      }
    };

    fetchFavorites();
  }, []);

  const addToFavorites = async (country) => {
    try {
      const response = await axiosInstance.post("/user/addfavorite", {
        country: country.name,
      });

      // If the favorite is successfully added, update the favorites state
      if (response.data.success) {
        setFavorites((prevFavorites) => [...prevFavorites, country.name]);
      }
    } catch (err) {
      console.error("Error adding to favorites", err);
      setError("Error adding to favorites.");
    }
  };

  useEffect(() => {
    if (searchHistory.length === 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchHistory.length]);

  // Calculate the index of the first and last country details to display
  const indexOfLastCountry = currentPage * itemsPerPage;
  const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;

  // Sort the country details based on the selected order
  const sortedCountries = [...countryDetails].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  // Get current countries based on pagination
  const currentCountries = sortedCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  return (
    <Box
      className="container mt-4"
      p={4}
      bg={useColorModeValue("gray.50", "gray.800")}
      minH="100vh"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h1" size="lg">
          Dashboard
        </Heading>
        <Flex>
          <Input
            ref={inputRef}
            placeholder="Search by currency code..."
            value={searchQuery}
            onChange={handleSearch}
            mr={2}
          />
          <IconButton
            icon={<SearchIcon />}
            onClick={() => debouncedSearch(searchQuery)}
            colorScheme="teal"
          />
        </Flex>
      </Flex>
      <Divider mb={4} />

      <Stack spacing={6}>
        <Box>
          <Heading size="md">Favorites</Heading>
          {favorites && favorites.length > 0 ? (
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {favorites.map((favorite, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  boxShadow="md"
                  bg={useColorModeValue("white", "gray.700")}
                  textAlign="center"
                >
                  <Text fontSize="lg" fontWeight="bold">
                    {favorite}
                  </Text>
                </Box>
              ))}
            </Grid>
          ) : (
            <Text color="gray.500">No favorites found.</Text>
          )}
        </Box>

        <Box>
          <Heading size="md">Search History</Heading>
          {searchHistory.length > 0 ? (
            <Stack spacing={2}>
              {searchHistory.map((item, index) => (
                <Text
                  key={index}
                  p={2}
                  bg={useColorModeValue("white", "gray.700")}
                  borderRadius="md"
                >
                  {item}
                </Text>
              ))}
            </Stack>
          ) : (
            <Text color="gray.500">
              No search history. Please initiate a search to see results.
            </Text>
          )}
        </Box>

        <Box>
          <Heading size="md">Country Details</Heading>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <Select
            placeholder="Sort by"
            onChange={handleSortChange}
            mb={4}
            value={sortOrder}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </Select>
          {currentCountries.length > 0 ? (
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {currentCountries.map((country, index) => (
                <CountryDetailsCard
                  key={index}
                  countryName={country.name}
                  capital={country.capital}
                  languages={country.languages}
                  currency={country.currency}
                  flagUrl={country.flag}
                  onAddToFavorites={() => addToFavorites(country)}
                />
              ))}
            </Grid>
          ) : (
            <Text color="gray.500">No country details found.</Text>
          )}
          <Flex justify="space-between" mt={4}>
            <Button
              onClick={() => handlePageChange("prev")}
              isDisabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() => handlePageChange("next")}
              isDisabled={currentCountries.length < itemsPerPage}
            >
              Next
            </Button>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
};

export default Dashboard;
