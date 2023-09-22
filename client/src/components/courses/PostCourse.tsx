/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import { ICourse } from "../../Interfaces/InterfaceCourse";
// import useFetch from "../lib/useFetch";
// import { useFetch2Post } from "../lib/useFetchToPost";
import AddNewCourse from "../../pages/Dashboard_Teacher/AddNewCourse";
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function PostCourse() {
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState(0);
  const [major, setMajor] = useState("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [course, setCourse] = useState<ICourse[]>([]);
  // const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const addedCourse = {
    title,
    hours,
    major,
  };

  const handleAddCourse = (course: ICourse) => {
    setCourse((prevCourse) => [...prevCourse, course]);
  };

  const handleSubmitCourse = async (e: any) => {
    e.preventDefault();

    try {
      console.log("course:", JSON.stringify(addedCourse));

      await fetch("http://localhost:3003/course/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addedCourse),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(`There is an error ${e}`);
          setSubmitted(false);
        });
    } catch (error) {
      console.log(error);
      setSubmitted(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(course);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    try {
      await fetch("http://localhost:3003/course/find_all")
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(`there is an err ${err}`));
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    return navigate("/course/my_courses/");
  };
  return (
    <div>
      {token ? (
        <>
          {submitted ? (
            <>
              <Flex
                w={"100%"}
                h={300}
                justifyContent={"space-around"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Heading size={"lg"}>Submitted was seccessfully</Heading>
                <Button colorScheme="blue" onClick={goBack}>
                  Go To Courses Page
                </Button>
              </Flex>
            </>
          ) : (
            <>
              <Center h={400}>
                <SimpleGrid
                  templateColumns={"repeat(1, 1fr)"}
                  w={500}
                  justifyContent={"center"}
                  alignItems={"center"}
                  rowGap={15}
                >
                  <Heading size={"md"} >
                    Title
                  </Heading>
                  <Input
                    className="inp"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Heading size={"md"} >
                    Hours
                  </Heading>
                  <Input
                    className="inp"
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                  />
                  <Heading size={"md"} >
                    Major
                  </Heading>
                  <Input
                    className="inp"
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                  />

                  <Button
                    type="submit"
                    onClick={handleSubmitCourse}
                    colorScheme="blue"
                  >Submit Course</Button>
                </SimpleGrid>
              </Center>
            </>
          )}
        </>
      ) : (
        <>
          <Heading size={"md"}>You are not auth</Heading>
        </>
      )}
    </div>
  );
}

export default PostCourse;
