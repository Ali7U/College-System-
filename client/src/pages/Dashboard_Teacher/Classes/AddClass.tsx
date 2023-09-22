import { Box, Center, Heading, Input } from "@chakra-ui/react";
import React from "react";

function AddClass(props: any) {
  const {
    handleSubmitClass,
    setClass_id,
    setNumOfStudents,
    setFromTime,
    setToTime,
    setCourseId,
  } = props;
  return (
    <Center p={20}>
      <Box w={"50%"}>
        <Heading size={"md"}>Class ID</Heading>
        <Input
          className="inp"
          type="text"
          onChange={(e) => setClass_id(Number(e.target.value))}
        />
        <Heading size={"md"}>Number Of Student</Heading>
        <Input
          className="inp"
          type="number"
          onChange={(e) => setNumOfStudents(Number(e.target.value))}
        />
        <Heading size={"md"}>Start Time</Heading>
        <Input
          className="inp"
          type="datetime-local"
          onChange={(e) => setFromTime(e.target.value)}
        />
        <Heading size={"md"}>End Time</Heading>
        <Input
          className="inp"
          type="datetime-local"
          onChange={(e) => setToTime(e.target.value)}
        />
        <Heading size={"md"}>Course ID</Heading>
        <Input
          className="inp"
          type="text"
          onChange={(e) => setCourseId(e.target.value)}
        />

        <Input type="submit" cursor={"pointer"} bg={"lightblue"} onClick={handleSubmitClass} />
      </Box>
    </Center>
  );
}

export default AddClass;
