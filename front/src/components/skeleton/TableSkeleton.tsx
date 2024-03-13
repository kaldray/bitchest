import { Flex, Skeleton } from "@chakra-ui/react";

type TableSkeletonProps = {
  skeletonHeight: string;
};

export const TableSkeleton = ({ skeletonHeight }: TableSkeletonProps) => {
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
