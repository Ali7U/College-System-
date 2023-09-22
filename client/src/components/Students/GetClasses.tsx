import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IClass } from "../../Interfaces/InterfaceClass";
import { Box, Button, Flex, Heading, SimpleGrid } from "@chakra-ui/react";

function GetClasses() {
  const [data, setData] = useState([]);
  const navigator = useNavigate();
  const token = localStorage.getItem("token");

  const fethClasses = async () => {
    await fetch(`http://localhost:3003/classes/`)
      .then((res) => res.json())
      .then((data) => setData(data.classes))
      .catch((e) => console.log(`there is an error ${e}`));
  };

  useEffect(() => {
    fethClasses();
  }, []);


  // let con: string;
  // data.map((item) =>
  //   item.class_1.controller.role === "Teacher" ? (con = "T.") : (con = "D. ")
  // );
  console.log(data);

  return (
    <>
      <SimpleGrid templateColumns={"repeat(1, 1fr)"} gap={15} m={15} h={40}>
        {data.map((item: IClass) => (
          <Box
            key={item.id}
            boxShadow={"0 0 15px silver"}
            borderRadius={15}
            p={15}
          >
            <SimpleGrid
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
              ]}
            >
              <Heading size={"md"}>Class ID: {item.class_id}</Heading>
              <Heading size={"md"}>
                Title of course: {item.course.title}
              </Heading>
              <Heading size={"md"}>Major: {item.course.major}</Heading>
              <Heading size={"sm"}>
                Start Class: {moment(item.fromTime).format("dddd LT")}
              </Heading>
              <Heading size={"sm"}>
                End Class: {moment(item.toTime).format("dddd LT")}
              </Heading>
              <Heading size={"sm"}>
                Availavle Students: {item.numOfStudents}
              </Heading>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => navigator("/myDashboard/Show_Classes/added/")}
                w={100}
              >
                Add Class ?
              </Button>
            </SimpleGrid>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}

export default GetClasses;
