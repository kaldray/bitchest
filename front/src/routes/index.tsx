import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
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

import { userStore } from "@/store/userStore.js";

class ErrorResponse extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Error Response";
  }
}

export const Route = createFileRoute("/")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { setState } = userStore;

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const credentials = {
      email,
      password,
    };
    try {
      const lazyLoading = await import("@/api/index");
      const response = await lazyLoading.signIn(credentials);
      if (response.status === 200 && response.data.user === "admin") {
        setState({ user: response.data.user });
        // return navigate({ to: "/admin" });
      } else {
        setState({ user: response.data.user });
        return navigate({ to: "/currencies" });
      }
    } catch (err) {
      if (err instanceof ErrorResponse) {
        setError(err.message);
      }
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
                <AlertDescription>{error}</AlertDescription>
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
            //@ts-ignore
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
}
