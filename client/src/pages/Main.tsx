import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { FiUser } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Main() {
    const navigate = useNavigate()
  return (
    <Flex
      w={"100%"}
      h={500}
      alignItems={"center"}
      justifyContent={"space-evenly"}
    >
      <Flex
        alignItems={"center"}
        cursor={"pointer"}
        justifyContent={"center"}
        w={250}
        border={"1px"}
        h={150}
        borderRadius={15}
        flexDirection={"column"}
        bg={"lightgreen"}
        onClick={() => navigate("/login")}
      >
        <Heading size={"2xl"}>
          <MdAdminPanelSettings />
        </Heading>
        <Heading size={"md"}>Login For Admins</Heading>
      </Flex>
      <Flex
        alignItems={"center"}
        cursor={"pointer"}
        justifyContent={"center"}
        w={250}
        bg={"lightblue"}
        border={"1px"}
        h={150}
        flexDirection={"column"}
        borderRadius={15}
        onClick={() => navigate("/students/login")}
      >
        <Heading size={"2xl"}>
          <FiUser />
        </Heading>
        <Heading size={"md"}>Login For Students</Heading>
      </Flex>
    </Flex>
  );
}

export default Main;
