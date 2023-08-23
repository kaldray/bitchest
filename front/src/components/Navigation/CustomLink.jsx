import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

/**
 * @param {Object} props
 * @param {string} props.from
 * @param {string} props.to
 * @param {Object} props.params
 * @param {Object} props.searchParams
 * @param {JSX.Element} props.children
 * @param {Object} props.style
 * @returns {JSX.Element}
 * @constructor
 */
export const CustomLink = ({ to, from, children, params, searchParams, ...style }) => {
  return (
    <>
      <ChakraLink as={Link} to={to} from={from} params={params} search={searchParams} {...style}>
        {children}
      </ChakraLink>
    </>
  );
};
