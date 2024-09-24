"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import axiosInstance from "../utils/axiosInstance.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/user/login", values);

        // If login is successful and backend has set the cookies
        setMessage("Login successful!");

        // Check if cookies are set by backend
        const isAuth = Cookies.get("is_auth");
        console.log(isAuth);
        
        // const accessToken = Cookies.get("accessToken");
        // console.log(accessToken);
        

        if (isAuth) {
          navigate("/dashboard");
          window.location.reload(); 
        } else {
          setMessage("Login failed. Please try again.");
        }
      } catch (error) {
        setMessage(error.response?.data?.message || "An error occurred.");
      }
    },
  });

  return (
    <Flex
      minH={"9vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading
            fontSize={"4xl"}
            color={useColorModeValue("gray.800", "white")}
          >
            Sign in to your account
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                required
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              {message && (
                <Text
                  color={message.includes("successful") ? "green.500" : "red.500"}
                >
                  {message}
                </Text>
              )}
              <Button
                onClick={formik.handleSubmit}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
