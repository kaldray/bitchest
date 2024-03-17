import { createLazyFileRoute } from "@tanstack/react-router";
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
import { useState, type FormEvent } from "react";
import { WrongCredientials, type UserRole, type WrongCredientialsType } from "@/api/index";

export type User = { id: number; email: string; role: string };

export const Route = createLazyFileRoute("/_authenticated/_layout/_admin/users/update/$id")({
  component: UpdateUser,
});

function UpdateUser() {
  const user: User = Route.useLoaderData();
  const navigate = useNavigate();
  const router = useRouter();
  const [error, setError] = useState<{ errors: WrongCredientialsType } | null>(null);
  const otherRole = user.role === "admin" ? "client" : "admin";

  const modifyUserInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      email: form.get("email") as string,
      role: form.get("role") as UserRole["role"],
    };
    try {
      const lazyLoading = await import("@/api/index");
      const response = await lazyLoading.updateUserById(String(user.id), payload);
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
}
