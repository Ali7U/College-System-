import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";

import { IShowClasses } from "../../Interfaces/InterfaceShowClasses";
import moment from "moment";
import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import Information from "./Information";

function MyClasses() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token") as string;

  const decodedToken: any = jwtDecode(token);

  const id = decodedToken.id;

  const fethClasses = async () => {
    await fetch(`http://localhost:3003/show_classes/my_class/All/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data.show))
      .catch((e) => console.log(`there is an error ${e}`));
  };

  useEffect(() => {
    fethClasses();
  }, []);
  console.log(data);

  // const info = () => {
  //   <Information data={data} />;
  // };

  let con:string;
  data.map((item:IShowClasses) =>
    item.class_1.controller.role === "Teacher" ? (con = "T.") : (con = "D. ")
  );
  return (
    <>
      <Heading size={"lg"} p={15}>
        My Classes
      </Heading>
      <SimpleGrid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
        gap={15}
        m={15}
        h={40}
      >
        {data.map((item: IShowClasses) => (
          <Box
            key={item.id}
            boxShadow={"0 0 15px silver"}
            borderRadius={15}
            p={15}
          >
            <Heading size={"md"}>
              Title of course: {item.class_1.course.title}
            </Heading>
            <Heading size={"sm"} textAlign={"center"}>
              Time:
            </Heading>
            <Heading size={"xs  "}>
              {moment(item.class_1.fromTime).format("dddd LT")} -{" "}
              {moment(item.class_1.toTime).format("dddd LT")}
            </Heading>
            {/* {item.maHeading((courseItem) => courseItem.course.hours)} */}
            <Heading size={"sm"}>Hours: {item.class_1.course.hours}</Heading>
            <Heading size={"md"}>{item.class_1.course.major}</Heading>
            <Heading size={"sm"}>
              {con} {item.class_1.controller.fName}{" "}
              {item.class_1.controller.lName}
            </Heading>
            {/* <Button onClick={info} borderRadius={"50%"}>info</Button> */}
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}

export default MyClasses;
