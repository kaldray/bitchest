import { Box, Flex, IconButton, Image } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { useSidebarStore } from "@/store/sidebarStore";
import { NavigationLinks } from "@/components/Navigation/NavigationLinks";
import { useLoader } from "@tanstack/react-router";
import { userStore } from "@/store/userStore";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export const Layout = ({ children }) => {
  const { mobileSize, toggleSidebar } = useSidebarStore((store) => store);
  const { getState } = userStore;
  /**
   * @type {import("@/pages/UserWallets").Wallet}
   */
  const wallet = useLoader();
  const endOrCenter = mobileSize === "100%" ? "flex-end" : "center";

  return (
    <>
      <Flex>
        <Box
          bg={"blue.200"}
          maxW={["40%", "250px"]}
          w={[mobileSize, "100%"]}
          h="100vh"
          zIndex={10}
          as="nav"
          position={["absolute", "initial"]}
          display={"inline-block"}>
          <Box
            justifyContent={"center"}
            maxW={200}
            mx={"auto"}
            boxSize="sm"
            w={200}
            h={"auto"}
            hideBelow="sm"
            aria-hidden={true}>
            <Image src="/bitchest_logo.png" alt="Logo de Bitchest" />
          </Box>
          <Flex
            justifyContent={"space-between"}
            flexDir={"column"}
            alignItems={"center"}
            h={"calc(100% - 61.1667px)"}>
            {getState().user === "client" && (
              <Box as={"span"} aria-label={""}>
                Solde : {wallet.quantity} €
              </Box>
            )}
            <Flex p={2} hideFrom="sm" justifyContent={endOrCenter}>
              <IconButton
                aria-label={"Ouvrir/Fermer le menu latéral"}
                icon={<HamburgerIcon />}
                onClick={() => toggleSidebar()}
              />
            </Flex>
            <NavigationLinks mobileSize={mobileSize} />
          </Flex>
        </Box>
        <Box as="main" w={["100%", "75%"]} ml={["15%", "0%"]} px={2} pt={2} display={"inline"}>
          {children}
        </Box>
      </Flex>
    </>
  );
};
