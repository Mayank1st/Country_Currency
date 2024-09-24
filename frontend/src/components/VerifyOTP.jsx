"use client";

import {
  Center,
  Heading,
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
  PinInput,
  PinInputField,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFormik } from "formik";
import axiosInstance from "../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/user/verify-email", {
          email: values.email,
          otp: otp,
        });
        setMessage(response.data.message);
        navigate("/login");
      } catch (error) {
        setMessage(error.response.data.message);
      }
    },
  });

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Verify your Email
          </Heading>
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Please enter your email and OTP, check OTP in spam as well.
        </Center>
        <FormControl>
          <Input
            type="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            mb={4}
            isRequired
          />
        </FormControl>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "gray.400")}
        >
          {email}
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput onComplete={(value) => setOtp(value)}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        {message && (
          <Text color={message.includes("success") ? "green.500" : "red.500"}>
            {message}
          </Text>
        )}
        <Stack spacing={6}>
          <Button
            onClick={formik.handleSubmit}
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
