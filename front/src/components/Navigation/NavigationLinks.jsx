import { useNavigate } from "@tanstack/react-router";
import { Button, Flex } from "@chakra-ui/react";

import { userStore } from "@/store/userStore";
import { signOut } from "@/api";
import { AdminNavLink } from "@/components/Navigation/AdminNavLink";
import { ClientNavLink } from "@/components/Navigation/ClientNavLink";

export const NavigationLinks = ({ mobileSize }) => {
  const { setState, getState } = userStore;
  const navigate = useNavigate();
  const isToDisplay = mobileSize === "100%" ? 0 : 200;
  const signOutAndRedirect = async () => {
    try {
      const response = await signOut();
      if (response.status === 200) {
        setState({ user: null });
        navigate({ to: "/", replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {getState().user !== null && (
        <>
          <Flex
            position={["relative", "initial"]}
            right={isToDisplay}
            p={5}
            justifyContent={"center"}
            flexDir={"column"}
            alignItems={"center"}
            gap={3}>
            <Button onClick={() => signOutAndRedirect()}>Déconnexion</Button>
            {getState().user === "admin" && <AdminNavLink />}
            {getState().user === "client" && <ClientNavLink />}
          </Flex>
        </>
      )}
    </>
  );
};
