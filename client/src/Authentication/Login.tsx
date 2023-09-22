import {
  Center,
  FormControl,
  SimpleGrid,
  Heading,
  FormLabel,
  Input,
  Button,
  Box,
  useToast,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IUser } from "../Interfaces/InterfaceUser";
// import Nav from "../Nav";
// import Main from "../pages/Main";
import { Link } from "react-router-dom";
import PostCourse from "../components/courses/PostCourse";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const submitLogin = async () => {
    try {
      const request = await fetch("http://localhost:3003/students/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({ email, password }),
      });

      const data: IUser = await request.json();

      if (request.status !== 200) {
        toast({
          title: "Email or Password is wrong",
          status: "error",
          duration: 3000,
          position: "top",
        });
        return;
      }
    //   localStorage.clear()
      toast({
        title: `Welcome ${email}`,
        status: "success",
        duration: 3000,
        position: "top",
      });

      localStorage.setItem("token", data.token);

      data.role === "Teacher"
        ? navigate("/Dashboard_Teacher")
        : data.role === "Admin"
        ? navigate("/Dashboard_Admin")
        : navigate("/myDashboard");
    } catch (error) {
      toast({
        title: "Server Error !",
        status: "error",
        duration: 3000,
        position: "top",
      });
    }
  };

  return (
    <Center>
      <FormControl>
        <SimpleGrid
          rowGap={5}
          border={"1px #444"}
          m={"40px auto"}
          w={"50%"}
          p={10}
          borderRadius={15}
          boxShadow={"0 0 5px #ccc"}
        >
          <Heading as="h3" size="lg" textAlign={"center"}>
            Sign In
          </Heading>
          <Box>
            <FormLabel>email</FormLabel>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </Box>

          <Box>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </Box>
          <Button onClick={submitLogin}>Log IN</Button>
          <Link to={"/signup"}>
            <Text>Don't have account ?</Text>
          </Link>
        </SimpleGrid>
      </FormControl>
    </Center>
  );
}

export default Login;
