import { Box, Flex, IconButton, Image } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { useSidebarStore } from "@/store/sidebarStore";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export const Layout = ({ children }) => {
  const { mobileSize, toggleSidebar } = useSidebarStore((store) => store);
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
          as="aside"
          position={["absolute", "initial"]}
          display={"inline-block"}>
          <Flex
            justifyContent={"center"}
            maxW={200}
            mx={"auto"}
            boxSize="sm"
            w={200}
            h={"auto"}
            hideBelow="sm">
            <Image src="/bitchest_logo.png" alt="Logo de Bitchest" />
          </Flex>
          <Flex p={2} hideFrom="sm" justifyContent={endOrCenter}>
            <IconButton
              aria-label={"Ouvrir/Fermer le menu latéral"}
              icon={<HamburgerIcon />}
              onClick={() => toggleSidebar()}
            />
          </Flex>
        </Box>
        <Box as="main" w={["100%", "75%"]} ml={["15%", "0%"]} p={2} display={"inline"}>
          {children}
        </Box>
      </Flex>
    </>
  );
};
