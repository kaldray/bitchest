import { type ChakraComponent, type ComponentWithAs, chakra } from "@chakra-ui/react";
import { Link as TanStackLink } from "@tanstack/react-router";

import { useSidebarStore } from "@/store/sidebarStore";
import type { LinkProps } from "@tanstack/react-router";

interface CustomLinkProps extends ChakraComponent<ComponentWithAs<"a">, LinkProps> {}

type shouldForwardProp = keyof LinkProps;

const toForward: Array<shouldForwardProp> = [
  "preload",
  "params",
  "search",
  "to",
  "hash",
  "state",
  "from",
  "mask",
  "replace",
  "resetScroll",
  "startTransition",
  "target",
  "activeOptions",
  "preloadDelay",
  "disabled",
  "activeProps",
  "inactiveProps",
  "children",
];

const MagicLink = chakra<typeof TanStackLink, LinkProps>(TanStackLink, {
  shouldForwardProp: (prop: shouldForwardProp) => toForward.includes(prop),
});

export const CustomLink: CustomLinkProps = ({ children, to, params, href, ...style }) => {
  const closeSidebar = useSidebarStore((state) => state.closeSideBar);
  const shouldCloseSideBar = () => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  return (
    <>
      <MagicLink
        activeOptions={{ exact: true }}
        params={params}
        startTransition={true}
        activeProps={{
          style: {
            fontWeight: "bold",
            textDecoration: "underline",
          },
        }}
        onClick={() => shouldCloseSideBar()}
        as={TanStackLink}
        to={to}
        {...style}>
        {children}
      </MagicLink>
    </>
  );
};
