import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

/**
 * @param {Object} props
 * @param {string} props.from
 * @param {string} props.to
 * @param {JSX.Element} props.children
 * @param {Object} props.style
 * @returns {JSX.Element}
 * @constructor
 */
export const CustomLink = ({ to, from, children, ...style }) => {
  return (
    <>
      <ChakraLink as={Link} to={to} from={from} {...style}>
        {children}
      </ChakraLink>
    </>
  );
};
