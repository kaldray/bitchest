import { Flex, Skeleton } from "@chakra-ui/react";

/**
 * @param {Object} props
 * @param {string}  props.skeletonHeight
 * @returns {JSX.Element}
 * @constructor
 */
export const TableSkeleton = ({ skeletonHeight }) => {
  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
        gap={"5rem"}
        mt={["5rem", "5rem", "0rem"]}
        height={"100%"}>
        <Skeleton h={skeletonHeight} w={"80%"} />
      </Flex>
    </>
  );
};
