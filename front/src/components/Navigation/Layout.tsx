import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "@/components/Navigation/Sidebar";
import type { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Flex>
        <Sidebar />
        <Box as="main" w={"100%"} ml={["0%"]} px={2} pt={2} display={"inline"}>
          {children}
        </Box>
      </Flex>
    </>
  );
};
