import React, { useState } from "react";
import {
  chakra,
  Box,
  Stack,
  HStack,
  Text,
  Container,
  Avatar,
  Tooltip,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axiosInstance from "../utils/axiosInstance";

const CountryDetailsCard = ({
  countryName,
  capital,
  languages,
  currency,
  flagUrl,
  isFavorited: initialIsFavorited,
  onFavoriteChange,
}) => {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  const handleHeartClick = async () => {
    try {
      if (isFavorited) {
        await axiosInstance.delete(`/user/favorites/${countryName}`);
      } else {
        await axiosInstance.post("/user/favorites", { countryName });
      }
      setIsFavorited((prev) => !prev);
      onFavoriteChange(countryName, !isFavorited); // Notify parent component
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <Container maxW="5xl" p={{ base: 5, md: 5 }}>
      <Stack
        w="18rem"
        spacing={1}
        p={4}
        border="1px solid"
        borderColor={useColorModeValue("gray.400", "gray.600")}
        rounded="md"
        margin="0 auto"
        _hover={{
          boxShadow: useColorModeValue(
            "0 4px 6px rgba(160, 174, 192, 0.6)",
            "0 4px 6px rgba(9, 17, 28, 0.4)"
          ),
        }}
      >
        <HStack justifyContent="space-between" alignItems="baseline">
          <Tooltip
            label={countryName}
            aria-label={countryName}
            placement="right-end"
            size="sm"
          >
            <Box pos="relative">
              <Avatar
                src={flagUrl}
                name={countryName}
                size="xl"
                borderRadius="md"
              />
            </Box>
          </Tooltip>
          <Box onClick={handleHeartClick} cursor="pointer">
            {isFavorited ? (
              <AiFillHeart color="red" size={24} />
            ) : (
              <AiOutlineHeart size={24} />
            )}
          </Box>
        </HStack>
        <chakra.h1 fontSize="xl" fontWeight="bold">
          {countryName}
        </chakra.h1>
        <Text fontSize="md" color="gray.500">
          Capital: {capital}
        </Text>
        <Text fontSize="md" color="gray.500">
          Languages: {languages}
        </Text>
        <Text fontSize="md" color="gray.500">
          Currency: {currency}
        </Text>
        <Divider />
        <Text fontSize="md" color="gray.500">
          Country details displayed here.
        </Text>
      </Stack>
    </Container>
  );
};

export default CountryDetailsCard;
