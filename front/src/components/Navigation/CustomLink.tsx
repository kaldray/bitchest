import { Link as ChakraLink, type ChakraComponent, type ComponentWithAs } from "@chakra-ui/react";
import { Link, type LinkPropsOptions } from "@tanstack/react-router";
import { useSidebarStore } from "@/store/sidebarStore";

interface CustomLinkProps extends ChakraComponent<ComponentWithAs<"a">, TanStackRouterLinkProps> {}
interface TanStackRouterLinkProps {
  to: LinkPropsOptions;
}
export const CustomLink: CustomLinkProps = ({ children, to, ...style }) => {
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
        onClick={() => shouldCloseSideBar()}
        as={Link}
        {...to}
        {...style}>
        {children}
      </ChakraLink>
    </>
  );
};
