"use client";

import {
  Box,
  Flex,
  Button,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sync auth state with Cookies
  useEffect(() => {
    const authCookie = Cookies.get("is_auth");
    setIsLoggedIn(!!authCookie);
  }, [Cookies.get("is_auth")]); // Re-run when `is_auth` cookie changes

  // Handle login redirection
  const handleLogin = () => {
    navigate("/login"); // Redirect to login page
  };

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("is_auth");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsLoggedIn(false); 
    navigate("/login");
    window.location.reload(); 
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex
        className="container"
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <a className="navbar-brand" href="#">
            <img
              src="https://www.svgrepo.com/show/206604/map-maps-and-location.svg"
              alt="Logo"
              width="50"
              height="40"
            />
          </a>
        </Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            {isLoggedIn ? (
              <Button colorScheme="teal" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button colorScheme="teal" onClick={handleLogin}>
                  Login
                </Button>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => navigate("/registration")}
                >
                  Register
                </Button>
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
