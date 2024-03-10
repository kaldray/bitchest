import { useLoader } from "@tanstack/react-router";
import { Flex, Td, Th, Tr } from "@chakra-ui/react";

import * as CustomTable from "@/components/table/Table.jsx";
import { CustomLink } from "@/components/Navigation/CustomLink";

/**
 * Represents a user with their crypto wallet information.
 * @typedef {Object} User
 * @property {number} id - The ID of the user.
 * @property {string} email - The email address of the user.
 * @property {CryptoWallet[]} crypto_wallets - An array of crypto wallets owned by the user.
 * @property {Wallet} wallet - The user's wallet information.
 */

/**
 * Represents a crypto wallet.
 * @typedef {Object} CryptoWallet
 * @property {string} quantity - The quantity of cryptocurrency in the wallet.
 * @property {string|null} capital_gain - The capital gain for this cryptocurrency.
 * @property {Currency} currency - The currency information of the cryptocurrency.
 */

/**
 * Represents a cryptocurrency.
 * @typedef {Object} Currency
 * @property {number} id - The ID of the cryptocurrency.
 * @property {string} crypto_name - The name of the cryptocurrency.
 */

/**
 * Represents the user's main wallet.
 * @typedef {Object} Wallet
 * @property {number} id - The ID of the wallet.
 * @property {number} quantity - The quantity of funds in the wallet.
 */

/**
 *
 * @typedef {Object} UserCryptoWallet
 * @property {number} ch_id
 * @property {number} quoting
 * @property {string} date
 * @property {number} currency_id
 * @property {string} crypto_name
 * @property {string} cw_id
 * @property {null|string} capital_gain
 * @property {number} quantity
 */

export const UserWallets = () => {
  /**
   * An array containing user information and their crypto wallets.
   * @type {Array<UserCryptoWallet>}
   */
  const userWithWallet = useLoader();

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
                <Tr key={val.cw_id}>
                  <Td>{val.crypto_name}</Td>
                  <Td>{val.quantity} </Td>
                  <Td>{val.capital_gain ?? 0} €</Td>
                  <Td>
                    <CustomLink
                      to={{
                        to: "/wallet/detail/$id",
                        from: "/",
                        params: { id: val.ch_id },
                      }}
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
};
