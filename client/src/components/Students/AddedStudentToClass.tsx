// /show_classes/added
import {
  SimpleGrid,
  Heading,
  Button,
  Box,
  Input,
  Center,
} from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IClass } from "../../Interfaces/InterfaceClass";

function AddedStudentToClass() {
  const params = useParams();
  const token = localStorage.getItem("token") as string;
  const navigator = useNavigate();

  const decodedToken: any = jwtDecode(token);
  const studentId = decodedToken.id;
  const [classId, setClassId] = useState("");
  const [data, setData] = useState([]);
  const [classes, setClasses] = useState([]);

  // console.log(decodedToken.id);

  const submitClass = {
    studentId,
    classId,
  };

  const handleSubmitClass = async (e: any) => {
    e.preventDefault();

    try {
      console.log("calss:", JSON.stringify(submitClass));

      await fetch("http://localhost:3003/show_classes/added", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitClass),
      })
        .then((res) => res.json())
        .then((data) => {
          setClasses(data);
          console.log(data);
        })
        .catch((e) => {
          console.log(`There is an error here ${e}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await fetch("http://localhost:3003/classes/")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.classes);

          setData(data.classes);
        })
        .catch((err) => console.log(`there is an err ${err}`));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Center p={15}>
        <Input
          className="inp"
          type="text"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          w={"50%"}
          border={"1px"}
        />
        <Input className="inp" type="hidden" value={studentId} />
      </Center>
      <Center>
        <Button
          colorScheme="blue"
          w={150}
          type="submit"
          onClick={handleSubmitClass}
          p={15}
        >
          Submit Class
        </Button>
      </Center>
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
              <Heading size={"sm"}>{item.id}</Heading>
            </SimpleGrid>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}

export default AddedStudentToClass;
