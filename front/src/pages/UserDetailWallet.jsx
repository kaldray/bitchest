import { Button, Flex, Td, Th, Tr } from "@chakra-ui/react";
import { useLoader, useRouter } from "@tanstack/react-router";

import * as CustomTable from "@/components/table/Table";

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
 * @property {string} cw_id
 * @property {number} ch_id
 * @property {number} quoting
 * @property {null|string} sell_at
 * @property {number} currency_id
 * @property {string} crypto_name
 * @property {null|string} capital_gain
 * @property {number} quantity
 * @property {string} purchased_at
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
            {userDetailedWallet.map((val) => {
              return (
                <Tr key={val.cw_id}>
                  <Td>{val.purchased_at}</Td>
                  <Td>{val.created_at}</Td>
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
