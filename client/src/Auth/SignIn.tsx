// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Link, SimpleGrid } from '@chakra-ui/react';
// import React from 'react'
// import { IUser } from '../Interfaces/InterfaceUser';

// function SignIn(props: IUser | any) {
//     const { email, password, submitLogin } = props
//   return (
//     <Center>
//       <FormControl>
//         <SimpleGrid
//           rowGap={5}
//           border={"1px #444"}
//           m={"40px auto"}
//           w={"50%"}
//           p={10}
//           borderRadius={15}
//           boxShadow={"0 0 5px #ccc"}
//         >
//           <Heading as="h3" size="lg" textAlign={"center"}>
//             Sign In
//           </Heading>
//           <Box>
//             <FormLabel>email</FormLabel>
//             <Input
//               type="text"
//               value={email}
//               onChange={(e) => email(e.target.value)}
//               placeholder="email"
//             />
//           </Box>

//           <Box>
//             <FormLabel>Password</FormLabel>
//             <Input
//               type="password"
//               value={password}
//               onChange={(e) => password(e.target.value)}
//               placeholder="password"
//             />
//           </Box>
//           <Button onClick={submitLogin}>Log IN</Button>
//           {/* <Link to={"/signup"}>
//             <Text>Don't have account ?</Text>
//           </Link> */}
//         </SimpleGrid>
//       </FormControl>
//     </Center>
//   );
// }

// export default SignIn
