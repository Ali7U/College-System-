import React from "react";
// import AddNewCourse from "./AddNewCourse";
import PostCourse from "../../components/courses/PostCourse";
import { useNavigate } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineClass, MdPostAdd } from "react-icons/md";
import { GiOpenBook } from "react-icons/gi";
import { FiDelete } from "react-icons/fi";
import { BiBookAdd } from "react-icons/bi";
import { Box, Center, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { GrUpdate } from "react-icons/gr";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <Heading size={"lg"} textAlign={"center"}>My Dashborad</Heading>
      <Center w={"100%"} m={"40px auto"}>
        <SimpleGrid
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
          // justifyContent={"center"}
          // alignItems={"center"}
          // h={1000}
          gap={25}
        >
          <Box
            cursor={"pointer"}
            w={250}
            h={150}
            border={"2px"}
            borderRadius={15}
            // padding={"50px"}
            onClick={() => navigate("/course/add")}
          >
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              h={150}
              flexDirection={"column"}
            >
              <Heading size={"2xl"}>
                <BiBookAdd />
              </Heading>
              <Heading size={"md"}>Add Course</Heading>
            </Flex>
          </Box>
          <Box
            cursor={"pointer"}
            w={250}
            h={150}
            border={"2px"}
            borderRadius={15}
            // padding={"50px"}
            onClick={() => navigate("/course/my_courses/")}
          >
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              h={150}
              flexDirection={"column"}
            >
              <Heading size={"2xl"}>
                <GiOpenBook />
              </Heading>
              <Heading size={"md"}>My Courses</Heading>
            </Flex>
          </Box>
          <Box
            cursor={"pointer"}
            w={250}
            h={150}
            border={"2px"}
            borderRadius={15}
            // padding={"50px"}
            onClick={() => navigate("/classes/")}
          >
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              h={150}
              flexDirection={"column"}
            >
              <Heading size={"2xl"}>
                <SiGoogleclassroom />
              </Heading>
              <Heading size={"md"}>My Classes</Heading>
            </Flex>
          </Box>
          <Box
            cursor={"pointer"}
            w={250}
            h={150}
            border={"2px"}
            borderRadius={15}
            // padding={"50px"}
            onClick={() => navigate("/classes/add")}
          >
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              h={150}
              flexDirection={"column"}
            >
              <Heading size={"2xl"}>
                <MdPostAdd />
              </Heading>
              <Heading size={"md"}>Add new class</Heading>
            </Flex>
          </Box>
          <Box
            cursor={"pointer"}
            w={250}
            h={150}
            border={"2px"}
            borderRadius={15}
            // padding={"50px"}
            onClick={() => navigate("/classes/remove")}
          >
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              h={150}
              flexDirection={"column"}
            >
              <Heading size={"2xl"}>
                <FiDelete />
              </Heading>
              <Heading size={"md"}>Remove Class</Heading>
            </Flex>
          </Box>{" "}
          <Box
            cursor={"pointer"}
            w={250}
            h={150}
            border={"2px"}
            borderRadius={15}
            // padding={"50px"}
            onClick={() => navigate("/classes/")}
          >
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              h={150}
              flexDirection={"column"}
            >
              <Heading size={"2xl"}>
                <GrUpdate />
              </Heading>
              <Heading size={"md"}>Update Class</Heading>
            </Flex>
          </Box>
        </SimpleGrid>
      </Center>
    </>
  );
}

export default Dashboard;
