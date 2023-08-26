import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

/**
 * @param {Object} props
 * @param {import("@tanstack/react-router").LinkPropsOptions} props.to
 * @param {JSX.Element} props.children
 * @param {Object} props.style
 * @returns {JSX.Element}
 * @constructor
 */
export const CustomLink = ({ to, children, ...style }) => {
  return (
    <>
      <ChakraLink as={Link} {...to} {...style}>
        {children}
      </ChakraLink>
    </>
  );
};
