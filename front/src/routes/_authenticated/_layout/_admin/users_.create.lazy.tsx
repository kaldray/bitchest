import { createLazyFileRoute } from "@tanstack/react-router";
import type { UserRole } from "@/api/index";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { WrongCredientials, type WrongCredientialsType } from "@/api";

export const Route = createLazyFileRoute("/_authenticated/_layout/_admin/users/create")({
  component: CreateUser,
});

function CreateUser() {
  const navigate = useNavigate();
  const router = useRouter();
  const [error, setError] = useState<{ errors: WrongCredientialsType } | null>(null);

  const addNewUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      email: form.get("email") as string,
      role: form.get("role") as UserRole["role"],
      password: form.get("password") as string,
      password_confirmation: form.get("password_confirmation") as string,
    };

    try {
      const lazySignIn = await import("@/api/index");
      const response = await lazySignIn.addUser(payload);
      if (response.status === 200) {
        router.invalidate();
        navigate({ to: "/users" });
      }
    } catch (err) {
      if (err instanceof WrongCredientials) {
        setError(err);
      }
    }
  };

  return (
    <>
      <Box w={["60%", "80%"]} mx={"auto"} mt={["5rem", "5rem", "0rem"]}>
        <Text textAlign={"center"} as={"h1"} fontSize={"1.2rem"} fontWeight={"700"} my={"3rem"}>
          Ajouter un utilisateur
        </Text>
        {error !== null && (
          <>
            <Alert status="error" my={"1rem"}>
              <AlertIcon />
              <AlertDescription>
                {error.errors?.email?.map((val) => val)} {error.errors?.password?.map((val) => val)}
              </AlertDescription>
            </Alert>
          </>
        )}
        <Flex
          p={"2rem"}
          border={"1px"}
          borderColor="gray.200"
          as={"form"}
          gap={"1rem"}
          flexDir={"column"}
          //@ts-ignore
          onSubmit={(e) => addNewUser(e)}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name={"email"} type="email" />
          </FormControl>
          <FormControl>
            <FormLabel>Mot de passe</FormLabel>
            <Input name={"password"} type="password" autoComplete={"new-password"} />
          </FormControl>
          <FormControl>
            <FormLabel>Vérifier le mot de passe</FormLabel>
            <Input name={"password_confirmation"} type="password" autoComplete={"new-password"} />
          </FormControl>
          <FormControl>
            <FormLabel>Rôle</FormLabel>
            <Select name={"role"}>
              <option>admin</option>
              <option>client</option>
            </Select>
          </FormControl>
          <Button type={"submit"}>Ajouter</Button>
        </Flex>
      </Box>
    </>
  );
}
