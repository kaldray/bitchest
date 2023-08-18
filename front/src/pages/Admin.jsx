import { Button, Flex, Td, Th, Tr } from "@chakra-ui/react";
import { useLoader } from "@tanstack/react-router";
import { CustomTable } from "@/components/table/table.jsx";

/**
 * @typedef {{id:number,email:string,role:string}} User
 * @typedef {User[]} Users
 */

export const Admin = () => {
  /**
   * @type {Users} users
   */
  const users = useLoader();

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
              <Button bg={"yellow.500"}>Modifier</Button>
            </Td>
            <Td>
              <Button bg={"red.500"}>Supprimer</Button>
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
