import { Link as ChakraLink, type ChakraComponent, type ComponentWithAs } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

import { useSidebarStore } from "@/store/sidebarStore";
import type { LinkProps } from "@tanstack/react-router";

interface CustomLinkProps extends ChakraComponent<ComponentWithAs<"a">, LinkProps> {}

export const CustomLink: CustomLinkProps = ({ children, to, params, ...style }) => {
  const closeSidebar = useSidebarStore((state) => state.closeSideBar);
  const shouldCloseSideBar = () => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  return (
    <>
      {/*//@ts-ignore*/}
      <ChakraLink
        activeProps={{
          style: {
            //@ts-ignore
            fontWeight: "bold",
            textDecoration: "underline",
          },
        }}
        params={params}
        onClick={() => shouldCloseSideBar()}
        as={Link}
        to={to}
        {...style}>
        {children}
      </ChakraLink>
    </>
  );
};
