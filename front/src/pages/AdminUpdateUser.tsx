import { useNavigate, useRouter } from "@tanstack/react-router";
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
import { useState } from "react";
import { updateUserRoute } from "@/router/route";
import type { UserRole } from "@/api/index";

export type User = { id: number; email: string; role: string };

export type WrongCredientialsType = {
  email: Array<any>;
  password: Array<any>;
};
export class WrongCredientials extends Error {
  public errors: WrongCredientialsType;
  constructor(message: string) {
    super(message);
    this.name = "Wrong Credientials";
  }
}

export const AdminUpdateUser = () => {
  const user: User = updateUserRoute.useLoader();
  const navigate = useNavigate();
  const router = useRouter();
  const [error, setError] = useState<{ errors: WrongCredientialsType } | null>(null);
  const otherRole = user.role === "admin" ? "client" : "admin";

  const modifyUserInfo = async (e: HTMLFormElement) => {
    e.preventDefault();
    const form = new FormData(e);
    const payload = {
      email: form.get("email") as string,
      role: form.get("role") as UserRole["role"],
    };
    try {
      const lazyLoading = await import("@/api/index");
      const response = await lazyLoading.updateUserById(String(user.id), payload);
      if (response.status === 200) {
        router.invalidate();
        navigate({ to: "admin", from: "/" });
      }
    } catch (err) {
      if (err instanceof WrongCredientials) {
        setError(err);
      }
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
          //@ts-ignore
          onSubmit={(e) => modifyUserInfo(e)}>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input name={"email"} defaultValue={user.email} type="email" />
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
