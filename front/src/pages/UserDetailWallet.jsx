import { Button, Flex, Td, Th, Tr } from "@chakra-ui/react";
import { useLoader, useRouter } from "@tanstack/react-router";

import * as CustomTable from "@/components/table/Table";
import { sellCurrency } from "@/api";

/**
 * @typedef {Object} CryptoWallet
 * @property {string} quantity - La quantité de crypto-monnaie dans le portefeuille.
 * @property {string} id - La quantité de crypto-monnaie dans le portefeuille.
 * @property {string} created_at - La date de création du portefeuille au format "JJ-MM-AAAA".
 * @property {string} sell_at - La date de vente du portefeuille au format "JJ-MM-AAAA".
 * @property {number|null} capital_gain - Le gain en capital (peut être null).
 * @property {import("@/pages/UserWallets").Currency} currency - Les informations sur la devise crypto associée.
 */

/**
 * @typedef {Object} UserData
 * @property {number} id - L'identifiant de l'utilisateur.
 * @property {string} email - L'adresse e-mail de l'utilisateur.
 * @property {CryptoWallet[]} crypto_wallets - Les portefeuilles de crypto-monnaie de l'utilisateur.
 * @property {import("@/pages/UserWallets").Wallet} wallet - Les données du portefeuille de l'utilisateur.
 */

export const UserDetailWallet = () => {
  /** @type {UserData[]} */
  const userDetailedWallet = useLoader();
  const router = useRouter();

  /**
   *
   * @param {React.SyntheticEvent} e
   * @param {string} id
   * @returns {Promise<void>}
   */
  const sellACurrency = async (e, id) => {
    e.preventDefault();
    try {
      const res = await sellCurrency(id);
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
              <Th>Bénéfices</Th>
              <Th>Vendre</Th>
            </Tr>
          </CustomTable.CustomThead>
          <CustomTable.CustomTbody>
            {userDetailedWallet[0].crypto_wallets.map((val, key) => {
              return (
                <Tr key={val.currency.id + key}>
                  <Td>{val.currency.crypto_name}</Td>
                  <Td>{val.created_at}</Td>
                  <Td>{val.sell_at ?? "non vendu"}</Td>
                  <Td>{val.quantity}</Td>
                  <Td>{val.capital_gain ?? 0}</Td>
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
                      onClick={(e) => sellACurrency(e, val.id)}>
                      Vendre
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </CustomTable.CustomTbody>
        </CustomTable.TableRoot>
      </Flex>
    </>
  );
};
