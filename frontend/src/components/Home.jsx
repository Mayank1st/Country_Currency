import { Box, Link, Heading, Flex, Text, Button } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box
      className="mt-4"
      position="relative"
      bgImage="url('https://images.unsplash.com/photo-1545893835-abaa50cbe628?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      p={6}
    >
      <Link to="/">
        <Heading as="h1" size="4xl">
          <Box
            as="span"
            height="1px"
            width="1px"
            position="absolute"
            overflow="hidden"
          >
            Country Explorer
          </Box>
        </Heading>
      </Link>
      <Box
        className="container mt-5"
        margin="0 auto"
        maxW="64rem"
        py={{ base: "1rem", lg: "8rem" }}
      >
        <Heading
          as="h2"
          fontSize={{ base: "2.25rem", lg: "3rem" }}
          mb="4"
          color="#fff"
        >
          Explore Countries by Currency Code
        </Heading>
        <Flex
          justifyContent="start"
          flexDirection={{ base: "column", lg: "row" }}
          alignItems="center"
          maxWidth="42rem"
          marginX={{ base: "auto", lg: "0" }}
        >
          <Box
            pr={{ base: 0, lg: 5 }}
            width={{ base: "100%", lg: "50%" }}
            mb={{ base: "1rem", lg: "0" }}
          >
            <Text mb="0.5rem" color="#fff">
              Find detailed information about countries.
            </Text>
            <Button
              as={Link}
              bg="#fff"
              color="#000000"
              fontWeight="bold"
              px="2.5rem"
              py="1.5rem"
              width="full"
              border="2px solid #fff"
              rounded="md"
              _hover={{ bg: "gray.300", textDecoration: "none" }}
              to="/search"
            >
              Start Searching
            </Button>
          </Box>
          <Box pl={{ base: 0, lg: 5 }} width={{ base: "100%", lg: "50%" }}>
            <Text mb="0.5rem" color="#fff">
              Learn about currencies and their countries.
            </Text>
            <Button
              as={Link}
              bg="transparent"
              color="#fff"
              fontWeight="bold"
              px="2.5rem"
              py="1.5rem"
              width="full"
              border="2px solid #fff"
              rounded="md"
              _hover={{ bg: "gray.800", textDecoration: "none" }}
              to="/info"
            >
              Learn More
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
