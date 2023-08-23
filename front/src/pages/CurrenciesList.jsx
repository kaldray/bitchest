import { useLoader } from "@tanstack/react-router";
import { Flex, Td, Th, Tr } from "@chakra-ui/react";

import { CustomTable } from "@/components/table/table";
import { userStore } from "@/store/userStore";
import { CustomLink } from "@/components/Navigation/CustomLink";

export const CurrenciesList = () => {
  /**
   * @type {[{id:string,crypto_name:string,currency_histories:[{id:number,quoting:number,date:string}]}]}
   */
  const currencies = useLoader();
  const { getState } = userStore;

  const thead = (
    <>
      <Tr>
        <Th>Id</Th>
        <Th>Nom de la crypto-monnaie</Th>
        <Th>Cours actuelle</Th>
        <Th>Cours sur la période</Th>
        {getState().user === "client" && <Th>Acheter</Th>}
      </Tr>
    </>
  );

  const tbody = (
    <>
      {currencies.map((val) => {
        return (
          <Tr key={val.id}>
            <Td>{val.id} </Td>
            <Td>{val.crypto_name}</Td>
            <Td>{val.currency_histories[0].quoting}</Td>
            <Td>
              <CustomLink
                to={"currency/$id"}
                from={"/"}
                p={2}
                params={{ id: val.id }}
                bg={"blue.700"}
                color={"white"}
                borderRadius={"6px"}>
                Voir le cours
              </CustomLink>
            </Td>
            {getState().user === "client" && (
              <Td>
                <CustomLink
                  from={"/"}
                  to={"purchase"}
                  searchParams={{ currency_id: val.id, currency_name: val.crypto_name }}
                  p={2.5}
                  bg={"blue.500"}
                  color={"white"}
                  borderRadius={"6px"}>
                  Acheter
                </CustomLink>
              </Td>
            )}
          </Tr>
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