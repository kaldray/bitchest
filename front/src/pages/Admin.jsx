import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useLoader, useRouter, Link } from "@tanstack/react-router";
import { CustomTable } from "@/components/table/table.jsx";
import { removeUser } from "@/api/index.js";
import { useState } from "react";

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
  const [userId, setUserId] = useState(null);
  const { onClose, isOpen, onOpen } = useDisclosure();

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
              <Button
                type={"button"}
                bg={"red.500"}
                onClick={() => {
                  onOpen();
                  setUserId(u.id);
                }}>
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
        height={"100%"}
        mt={["5rem", "5rem", "0rem"]}>
        <ChakraLink
          as={Link}
          bg={"blue.200"}
          p={3}
          borderRadius={"6px"}
          to={"create-user"}
          from={"/"}>
          Ajouter un utilisateur
        </ChakraLink>
        <CustomTable thead={thead} tbody={tbody} title={"Liste des utilisateurs"} />
      </Flex>
      <Modal isCentered={true} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Veuillez confirmer votre choix</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Voulez vraiment supprimer l&apos;utilisateur ?</Text>
          </ModalBody>
          <ModalFooter>
            <Button bg={"blue.300"} mr={3} onClick={onClose}>
              Annuler
            </Button>
            <Button
              bg={"red.500"}
              variant="solid"
              onClick={() => {
                removeOneUser(userId);
                onClose();
              }}>
              Supprimer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
