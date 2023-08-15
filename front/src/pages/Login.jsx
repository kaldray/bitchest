import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";

export const Login = () => {
  return (
    <>
      <Container h={"100vh"} centerContent>
        <VStack w={"100%"} justifyContent={"center"} h={"100%"}>
          <Heading as={"h1"}>Se connecter</Heading>
          <VStack bg={"blue.200"} p={5} borderRadius={"0.5rem"} w={"80%"} gap={5} as={"form"}>
            <FormControl isRequired>
              <FormLabel color={"white"}>Email</FormLabel>
              <Input required type="email" placeholder={"test@test.com"} color={"white"} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color={"white"}>Mot de passe</FormLabel>
              <Input required type="password" color={"white"} />
            </FormControl>
            <Button type={"submit"}>Se connecter</Button>
          </VStack>
        </VStack>
      </Container>
    </>
  );
};
