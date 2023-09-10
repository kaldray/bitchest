import { useLoader, useNavigate, useRouter } from "@tanstack/react-router";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { updateUserById } from "@/api/index.js";
import { useState } from "react";

export const AdminUpdateUser = () => {
  /**
   * @typedef {import("./Admin.jsx").User} User
   * @type {User}
   */
  const user = useLoader();
  const navigate = useNavigate();
  const router = useRouter();
  const [error, setError] = useState(null);
  const otherRole = user.role === "admin" ? "client" : "admin";

  const modifyUserInfo = async (e) => {
    e.preventDefault();
    const target = e.target;
    const payload = {
      email: target.email.value,
      password: target.password.value,
      password_confirmation: target.password_confirmation.value,
      role: target.role.value,
    };
    try {
      const response = await updateUserById(user.id, payload);
      if (response.status === 200) {
        router.invalidate();
        navigate({ to: "admin", from: "/" });
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
        height={"100%"}
        mt={["5rem", "5rem", "0rem"]}>
        <Text as={"h1"} my={"1rem"}>
          Modifier un utilisateur
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
          w={"80%"}
          borderColor="gray.200"
          as={"form"}
          gap={"1rem"}
          flexDir={"column"}
          onSubmit={(e) => modifyUserInfo(e)}>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input name={"email"} defaultValue={user.email} type="email" />
          </FormControl>
          <FormControl>
            <FormLabel>Mot de passe</FormLabel>
            <Input
              name={"password"}
              required={true}
              type="password"
              autoComplete={"new-password"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Vérifier le mot de passe</FormLabel>
            <Input
              name={"password_confirmation"}
              required={true}
              type="password"
              autoComplete={"new-password"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Rôle</FormLabel>
            <Select name={"role"}>
              <option>{user.role}</option>
              <option>{otherRole}</option>
            </Select>
          </FormControl>
          <Button type={"submit"}>Modifier</Button>
        </Flex>
      </Flex>
    </>
  );
};
