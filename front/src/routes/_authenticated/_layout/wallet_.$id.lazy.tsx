import type { MouseEvent } from "react";
import { useRouter, createLazyFileRoute } from "@tanstack/react-router";
import { Button, Flex, Td, Th, Tr } from "@chakra-ui/react";

import * as CustomTable from "@/components/table/Table";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";

export const Route = createLazyFileRoute("/_authenticated/_layout/wallet/$id")({
  component: UserDetailWallet,
  pendingComponent: () => <TableSkeleton skeletonHeight={"300px"} />,
});

type UserData = {
  cw_id: string;
  ch_id: number;
  quoting: number;
  sell_at: null | string;
  currency_id: number;
  crypto_name: string;
  capital_gain: null | string;
  quantity: number;
  purchased_at: string;
};

function UserDetailWallet() {
  const userDetailedWallet: Array<UserData> = Route.useLoaderData();
  const router = useRouter();

  const sellACurrency = async (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    try {
      const lazyLoading = await import("@/api/index");
      const res = await lazyLoading.sellCurrency(id);
      if (res.status === 201) {
        router.invalidate();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Flex
        flexDir={"column"}
        gap={3}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}>
        <CustomTable.TableRoot title={"Voici le détail de vos achats."}>
          <CustomTable.CustomThead>
            <Tr>
              <Th>Crypto-monnaie</Th>
              <Th>Date d&apos;achat</Th>
              <Th>Date de vente</Th>
              <Th>Quantité</Th>
              <Th>
                Bénéfices <sup>en euros</sup>
              </Th>
              <Th>Vendre</Th>
            </Tr>
          </CustomTable.CustomThead>
          <CustomTable.CustomTbody>
            <UserDetailWalletMap
              userDetailedWallet={userDetailedWallet}
              sellACurrency={sellACurrency}
            />
          </CustomTable.CustomTbody>
        </CustomTable.TableRoot>
      </Flex>
    </>
  );
}

function UserDetailWalletMap({
  userDetailedWallet,
  sellACurrency,
}: {
  userDetailedWallet: Array<UserData>;
  sellACurrency: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
}) {
  return (
    <>
      {userDetailedWallet.map((val) => {
        return (
          <Tr key={val.cw_id}>
            <Td>{val.crypto_name}</Td>
            <Td>{val.purchased_at}</Td>
            <Td>{val.sell_at ?? "non vendu"}</Td>
            <Td>{val.quantity}</Td>
            <Td>{val.capital_gain ?? 0} €</Td>
            <Td>
              <Button
                bg={"blue.300"}
                _hover={{ bg: "blue.500" }}
                title={"Vendre la crypto-monnaie"}
                _disabled={{
                  bg: "blue.100",
                  cursor: "not-allowed",
                  opacity: "0.5",
                }}
                color={"black"}
                borderRadius={"6px"}
                aria-disabled={typeof val.sell_at === "string"}
                isDisabled={typeof val.sell_at === "string"}
                type={"button"}
                onClick={(e) => sellACurrency(e, val.cw_id)}>
                Vendre
              </Button>
            </Td>
          </Tr>
        );
      })}
    </>
  );
}
