import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { signIn } from "@/api/index.js";
import { userStore } from "@/store/userStore.js";

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setState } = userStore;

  /**
   *
   * @param {React.SyntheticEvent} e
   * @returns {Promise<void>}
   */
  const login = async (e) => {
    e.preventDefault();
    const target = e.target;
    const email = target.email.value;
    const password = target.password.value;
    const credentials = {
      email,
      password,
    };
    try {
      const response = await signIn(credentials);
      if (response.status === 200 && response.data.user === "admin") {
        setState({ user: response.data.user });
        return navigate({ to: "/admin" });
      } else {
        setState({ user: response.data.user });
        return navigate({ to: "/wallet" });
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <Container h={"100vh"} centerContent>
        <VStack w={"100%"} justifyContent={"center"} h={"100%"}>
          {error !== null && (
            <>
              <Alert status="error" my={"1rem"}>
                <AlertIcon />
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            </>
          )}
          <Heading as={"h1"}>Se connecter</Heading>
          <VStack
            bg={"blue.200"}
            p={5}
            borderRadius={"0.5rem"}
            w={"80%"}
            gap={5}
            as={"form"}
            onSubmit={(e) => login(e)}>
            <FormControl isRequired>
              <FormLabel color={"black"}>Email</FormLabel>
              <Input
                name={"email"}
                required
                color={"black"}
                type="email"
                placeholder={"test@test.com"}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color={"black"}>Mot de passe</FormLabel>
              <Input name={"password"} required type="password" color={"black"} />
            </FormControl>
            <Button type={"submit"}>Se connecter</Button>
          </VStack>
        </VStack>
      </Container>
    </>
  );
};
