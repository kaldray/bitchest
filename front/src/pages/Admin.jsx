import { Button, Flex, Td, Th, Tr } from "@chakra-ui/react";
import { useLoader, useRouter } from "@tanstack/react-router";

import { CustomTable } from "@/components/table/table.jsx";
import { removeUser } from "@/api/index.js";

/**
 * @typedef {{id:number,email:string,role:string}} User
 * @typedef {User[]} Users
 */

export const Admin = () => {
  /**
   * @type {Users} users
   */
  const users = useLoader();
  const router = useRouter();

  const removeOneUser = async (id) => {
    try {
      const response = await removeUser(id);
      if (response.status === 200) {
        router.invalidate();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const thead = (
    <>
      <Tr>
        <Th>ID</Th>
        <Th>Email</Th>
        <Th>Rôle</Th>
        <Th>Modifier</Th>
        <Th>Supprimer</Th>
      </Tr>
    </>
  );

  const tbody = (
    <>
      {users.map((u) => {
        return (
          <Tr key={u.id}>
            <Td>{u.id}</Td>
            <Td>{u.email}</Td>
            <Td>{u.role}</Td>
            <Td>
              <Button
                onClick={() =>
                  router.navigate({ to: "/update-user/$id", from: "admin", params: { id: u.id } })
                }
                type={"button"}
                bg={"yellow.500"}>
                Modifier
              </Button>
            </Td>
            <Td>
              <Button type={"button"} bg={"red.500"} onClick={() => removeOneUser(u.id)}>
                Supprimer
              </Button>
            </Td>
          </Tr>
        );
      })}
    </>
  );

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
        gap={"5rem"}
        mt={"5rem"}>
        <CustomTable thead={thead} tbody={tbody} title={"Liste des utilisateurs"} />
      </Flex>
    </>
  );
};
