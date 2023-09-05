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
import { addUser } from "@/api/index.js";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const AdminCreateUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const addNewUser = async (e) => {
    e.preventDefault();
    const target = e.target;
    const payload = {
      email: target.email.value,
      password: target.password.value,
      password_confirmation: target.password_confirmation.value,
      role: target.role.value,
    };
    try {
      const response = await addUser(payload);
      if (response.status === 200) {
        navigate({ to: "admin", from: "/" });
      }
    } catch (err) {
      setError(err);
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
              <AlertDescription>{error.message}</AlertDescription>
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
};
