import { Link as ChakraLink, type ChakraComponent, type ComponentWithAs } from "@chakra-ui/react";
import { Link, type ToSubOptions, type UseLinkPropsOptions } from "@tanstack/react-router";
import { useSidebarStore } from "@/store/sidebarStore";
import type { LinkProps, ParamOptions } from "@tanstack/react-router";

interface CustomLinkProps extends ChakraComponent<ComponentWithAs<"a">, LinkProps> {}

import { chakra } from "@chakra-ui/react";

// const MagicLink = chakra<typeof Link, LinkProps>(Link, {
//   // ensure that you're forwarding all of the required props for your case
//   shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
// });


export const CustomLink: CustomLinkProps = ({ children, to, params, ...style }) => {
  const closeSidebar = useSidebarStore((state) => state.closeSideBar);
  const shouldCloseSideBar = () => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  return (
    <>
      <ChakraLink
        activeProps={{
          style: {
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
