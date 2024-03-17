import { createFileRoute, defer, Outlet } from "@tanstack/react-router";
import { Box, Flex } from "@chakra-ui/react";

import { Sidebar } from "@/components/Navigation/Sidebar";
import { getUserWallet } from "@/api";

export const Route = createFileRoute("/_authenticated/_layout")({
  component: Layout,
  loader: async ({ abortController }) => {
    const response = getUserWallet(abortController);
    return {
      wallet: defer(response),
    };
  },
});

function Layout() {
  return (
    <>
      <Flex>
        <Sidebar />
        <Box as="main" w={"100%"} ml={["0%"]} px={2} pt={2} display={"inline"}>
          <Outlet />
        </Box>
      </Flex>
    </>
  );
}
