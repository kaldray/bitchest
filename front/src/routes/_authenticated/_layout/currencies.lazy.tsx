import { createLazyFileRoute } from "@tanstack/react-router";
import { Flex, Td, Th, Tr } from "@chakra-ui/react";

import * as CustomTable from "@/components/table/Table.jsx";
import { userStore } from "@/store/userStore";
import { CustomLink } from "@/components/Navigation/CustomLink";
import { Match } from "@/components/Match";

export type CurrenciesList = {
  id: string;
  crypto_name: string;
  currency_histories: Array<{ id: number; quoting: number; date: string }>;
};

export const Route = createLazyFileRoute("/_authenticated/_layout/currencies")({
  component: CurrenciesList,
});

function CurrenciesList() {
  const currencies: Array<CurrenciesList> = Route.useLoaderData();
  const { getState } = userStore;

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
        gap={"5rem"}
        mt={["5rem", "5rem", "0rem"]}
        height={"100%"}>
        <CustomTable.TableRoot title={"Liste des crypto-monnaies"}>
          <CustomTable.CustomThead>
            <Tr>
              <Th>Nom de la crypto-monnaie</Th>
              <Th>
                Cours actuelle <sup>en euros</sup>
              </Th>
              <Th>Cours sur la période</Th>
              <Match state="client">
                <Th>Acheter</Th>
              </Match>
            </Tr>
          </CustomTable.CustomThead>
          <CustomTable.CustomTbody>
            <CurrenciesListMap currencies={currencies} />
          </CustomTable.CustomTbody>
        </CustomTable.TableRoot>
      </Flex>
    </>
  );
}

function CurrenciesListMap({ currencies }: { currencies: Array<CurrenciesList> }) {
  return (
    <>
      {currencies.map((val) => {
        return (
          <Tr key={val.id}>
            <Td>{val.crypto_name}</Td>
            <Td>{val.currency_histories[0].quoting} €</Td>
            <Td>
              <CustomLink
                to="/currencies/$currency"
                params={{ currency: val.id }}
                p={2}
                bg={"blue.700"}
                color={"white"}
                preload="intent"
                borderRadius={"6px"}>
                Voir le cours
              </CustomLink>
            </Td>
            <Match state="client">
              <Td>
                <CustomLink
                  to="/purchase"
                  search={{
                    currency_name: val.crypto_name,
                    quoting: val.currency_histories[0].quoting,
                    ch_id: val.currency_histories[0].id,
                  }}
                  p={2.5}
                  bg={"blue.500"}
                  color={"white"}
                  borderRadius={"6px"}>
                  Acheter
                </CustomLink>
              </Td>
            </Match>
          </Tr>
        );
      })}
    </>
  );
}
