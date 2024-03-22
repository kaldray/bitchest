import { createLazyFileRoute } from "@tanstack/react-router";
import { Flex, Td, Th, Tr } from "@chakra-ui/react";

import * as CustomTable from "@/components/table/Table.jsx";
import { CustomLink } from "@/components/Navigation/CustomLink";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";

/**
 * Represents a crypto wallet.
 */
export type CryptoWallet = {
  quantity: string;
  capital_gain: string | null;
  currency: Currency;
};

/**
 * Represents a cryptocurrency.
 */
export type Currency = {
  id: number;
  crypto_name: string;
};

/**
 * Represents the user's main wallet.
 */
export type Wallet = {
  id: number;
  quantity: number;
};

export type UserCryptoWallet = {
  currency_id: number;
  crypto_name: string;
  capital_gain: null | string;
  quantity: number;
  user_id: number;
  ch_id: number;
};

export const Route = createLazyFileRoute("/_authenticated/_layout/wallet")({
  component: Wallet,
  pendingComponent: () => <TableSkeleton skeletonHeight={"300px"} />,
});

function Wallet() {
  const userWithWallet: Array<UserCryptoWallet> = Route.useLoaderData();

  if (!userWithWallet.length) {
    <p>Votre portefeuille est vide </p>;
  }

  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
        mt={["5rem", "5rem", "0rem"]}>
        <CustomTable.TableRoot title={"Mon portefeuille"}>
          <CustomTable.CustomThead>
            <Tr>
              <Th>Crypto-monnaie</Th>
              <Th>Quantité</Th>
              <Th>
                Bénéfices <sup>en euros</sup>
              </Th>
              <Th>Détails</Th>
            </Tr>
          </CustomTable.CustomThead>
          <CustomTable.CustomTbody>
            {userWithWallet.map((val) => {
              return (
                <Tr key={val.ch_id + "key"}>
                  <Td>{val.crypto_name}</Td>
                  <Td>{val.quantity} </Td>
                  <Td>{val.capital_gain ?? 0} €</Td>
                  <Td>
                    <CustomLink
                      to="/wallet/$id"
                      params={{ id: val.ch_id }}
                      bg={"blue.700"}
                      color={"white"}
                      borderRadius={"6px"}
                      p={2.5}>
                      Voir le détail
                    </CustomLink>
                  </Td>
                </Tr>
              );
            })}
          </CustomTable.CustomTbody>
        </CustomTable.TableRoot>
      </Flex>
    </>
  );
}
