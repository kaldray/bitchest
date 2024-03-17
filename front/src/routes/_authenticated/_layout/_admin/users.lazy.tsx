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
import { useState } from "react";
import { useRouter, Link } from "@tanstack/react-router";

import * as CustomTable from "@/components/table/Table.jsx";
import { removeUser } from "@/api/index.js";
import { CustomLink } from "@/components/Navigation/CustomLink";

import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/_layout/_admin/users")({
  component: UsersList,
});

export type User = { id: number; email: string; role: string };

type Users = Array<User>;

function UsersList() {
  const users: Users = Route.useLoaderData();
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const { onClose, isOpen, onOpen } = useDisclosure();

  const removeOneUser = async (id: string) => {
    try {
      const response = await removeUser(id);
      if (response.status === 200) {
        router.invalidate();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
        gap={"5rem"}
        height={"100%"}
        mt={["5rem", "5rem", "0rem"]}>
        <CustomLink bg={"blue.700"} p={3} color={"white"} borderRadius="6px" to="/users/create">
          Ajouter un utilisateur
        </CustomLink>
        <CustomTable.TableRoot title={"Liste des utilisateurs"}>
          <CustomTable.CustomThead>
            <Tr>
              <Th>Email</Th>
              <Th>Rôle</Th>
              <Th>Modifier</Th>
              <Th>Supprimer</Th>
            </Tr>
          </CustomTable.CustomThead>
          <CustomTable.CustomTbody>
            {users.map((u) => {
              return (
                <Tr key={u.id}>
                  <Td>{u.email}</Td>
                  <Td>{u.role}</Td>
                  <Td>
                    <CustomLink
                      to="/users/update/$id"
                      //@ts-ignore
                      params={{ id: u.id }}
                      p={3}
                      borderRadius={"6px"}
                      bg={"blue.700"}
                      color={"white"}>
                      Modifier
                    </CustomLink>
                  </Td>
                  <Td>
                    <Button
                      type={"button"}
                      bg={"red.500"}
                      onClick={() => {
                        onOpen();
                        setUserId(String(u.id));
                      }}>
                      Supprimer
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </CustomTable.CustomTbody>
        </CustomTable.TableRoot>
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
}
