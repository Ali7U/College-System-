import moment from "moment";
import React, { useEffect, useState } from "react";
import { IClass } from "../../Interfaces/InterfaceClass";
import { useNavigate } from "react-router-dom";
import PutClass from "./PutClass";
import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";

function GetClasses() {
  const [data, setData] = useState([]);
  const navigator = useNavigate();

  const fethClasses = async () => {
    await fetch(`http://localhost:3003/classes/`)
      .then((res) => res.json())
      .then((data) => setData(data.classes))
      .catch((e) => console.log(`there is an error ${e}`));
  };

  useEffect(() => {
    fethClasses();
  }, []);

  // console.log(fethClasses());
  let con: string;
  data.map((item: IClass) =>
    item.controller.role === "Teacher" ? (con = "T. ") : (con = "D. ")
  );

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
              gap={3}
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
              <Heading size={"sm"}>Hours: {item.course.hours}</Heading>
              <Heading size={"sm"}>Course ID: {item.courseId}</Heading>
              <Heading size={"sm"}>
                {`${con} ${item.controller.fName} ${item.controller.lName}`}
              </Heading>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => navigator("/classes/remove")}
                w={120}
              >
                Delete Class ?
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={async () => navigator(`/classes/update/${item.id}`)}
                w={120}
              >
                Update Class ?
              </Button>
            </SimpleGrid>
          </Box>
        ))}
      </SimpleGrid>
     
    </>
  );
}

export default GetClasses;
