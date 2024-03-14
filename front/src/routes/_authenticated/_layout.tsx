import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "@/components/Navigation/Sidebar";

export const Route = createFileRoute("/_authenticated/_layout")({
  component: Layout,
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
