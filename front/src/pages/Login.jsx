import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";

import { signIn } from "@/api/index.js";
import { useUserStore } from "@/store/userStore.js";

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore((state) => state);

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
      if (response.status === 200 && response.data.user.role === "admin") {
        setUser(response.data.user);
        return navigate({ to: "/admin" });
      } else {
        setUser(response.data.user);
        return navigate({ to: "/client" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container h={"100vh"} centerContent>
        <VStack w={"100%"} justifyContent={"center"} h={"100%"}>
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
              <FormLabel color={"white"}>Email</FormLabel>
              <Input
                name={"email"}
                required
                type="email"
                placeholder={"test@test.com"}
                color={"white"}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color={"white"}>Mot de passe</FormLabel>
              <Input name={"password"} required type="password" color={"white"} />
            </FormControl>
            <Button type={"submit"}>Se connecter</Button>
          </VStack>
        </VStack>
      </Container>
    </>
  );
};
