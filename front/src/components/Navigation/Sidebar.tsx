import { Box, Flex, IconButton, Image } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { NavigationLinks } from "@/components/Navigation/NavigationLinks";
import { useSidebarStore } from "@/store/sidebarStore";
import { userStore } from "@/store/userStore";

export const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebarStore((store) => store);
  const { getState } = userStore;

  // const wallet: Wallet = layout.useLoader();

  return (
    <>
      <Box
        bg={"blue.200"}
        maxW={["100%", "100%", "250px"]}
        w={"100%"}
        position={["fixed", "fixed", "initial"]}
        h={["auto", "auto"]}
        minH={"100dvh"}
        zIndex={10}
        as="nav"
        display={"inline-block"}>
        <Box
          justifyContent={"center"}
          maxW={200}
          mx={"auto"}
          boxSize="sm"
          w={200}
          h={"auto"}
          hideBelow="md"
          aria-hidden={true}>
          <Image src="/bitchest_logo.png" alt="Logo de Bitchest" />
        </Box>
        <Flex
          justifyContent={"flex-start"}
          flexDir={"column"}
          alignItems={"center"}
          h={"calc(100% - 61.1667px)"}>
          <Flex
            justifyContent={["flex-start", "flex-start", "center"]}
            w={"100%"}
            alignItems={"center"}>
            {getState().user === "client" && (
              <Box as={"span"} fontWeight={"700"} p={2}>
                {/* Solde : {wallet.quantity} € */}
              </Box>
            )}
            <Flex p={2} hideFrom="md" justifyContent={"flex-end"}>
              <IconButton
                _hover={{ bg: "gray.300" }}
                aria-pressed={isOpen}
                aria-label={"Ouvrir/Fermer le menu latéral"}
                icon={<HamburgerIcon />}
                onClick={() => {
                  toggleSidebar();
                }}
              />
            </Flex>
          </Flex>
          <NavigationLinks />
        </Flex>
      </Box>
    </>
  );
};
