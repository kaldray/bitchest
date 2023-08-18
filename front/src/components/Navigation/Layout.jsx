import { useNavigate } from "@tanstack/react-router";
import { Box, Button, Flex, IconButton, Image } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { useSidebarStore } from "@/store/sidebarStore";
import { signOut } from "@/api/index.js";
import { useUserStore } from "@/store/userStore.js";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export const Layout = ({ children }) => {
  const { mobileSize, toggleSidebar } = useSidebarStore((store) => store);
  const navigate = useNavigate();
  const { user, setUser } = useUserStore((state) => state);

  const endOrCenter = mobileSize === "100%" ? "flex-end" : "center";

  const signOutAndRedirect = async () => {
    try {
      const response = await signOut();
      if (response.status === 200) {
        setUser(null);
        navigate({ to: "/", replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          {user !== null && (
            <>
              <Flex p={5} justifyContent={"center"} flexDir={"column"} alignItems={"center"}>
                <Button onClick={() => signOutAndRedirect()}>Déconnexion</Button>
              </Flex>
            </>
          )}
          <Flex p={2} hideFrom="sm" justifyContent={endOrCenter}>
            <IconButton
              aria-label={"Ouvrir/Fermer le menu latéral"}
              icon={<HamburgerIcon />}
              onClick={() => toggleSidebar()}
            />
          </Flex>
        </Box>
        <Box as="main" w={["100%", "75%"]} ml={["15%", "0%"]} px={2} pt={2} display={"inline"}>
          {children}
        </Box>
      </Flex>
    </>
  );
};
