import { CustomTable } from "@/components/table/table";
import { Flex, Td, Th, Tr } from "@chakra-ui/react";
import { useLoader } from "@tanstack/react-router";
import { CustomLink } from "@/components/Navigation/CustomLink";

export const CurrenciesList = () => {
  /**
   *
   * @type {[{id:string,crypto_name:string}]}
   */
  const currencies = useLoader();

  const thead = (
    <>
      <Tr>
        <Th>Id</Th>
        <Th>Nom de la crypto-monnaie</Th>
        <Th>Cours</Th>
      </Tr>
    </>
  );

  const tbody = (
    <>
      {currencies.map((val) => {
        return (
          <>
            <Tr key={val.id}>
              <Td>{val.id} </Td>
              <Td>{val.crypto_name}</Td>
              <Td>
                <CustomLink
                  to={"currency/$id"}
                  from={"/"}
                  p={2}
                  bg={"blue.700"}
                  color={"white"}
                  borderRadius={"6px"}>
                  Voir le cours
                </CustomLink>
              </Td>
            </Tr>
          </>
        );
      })}
    </>
  );

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
        gap={"5rem"}
        mt={"5rem"}>
        <CustomTable thead={thead} tbody={tbody} title={"Liste des crypto-monnaies"} />
      </Flex>
    </>
  );
};
