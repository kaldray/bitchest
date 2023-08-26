import { useLoader, useRouter } from "@tanstack/react-router";
import { Button, Flex, Td, Th, Tr } from "@chakra-ui/react";
import { CustomTable } from "@/components/table/table";
import { sellCurrency } from "@/api";

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

export const UserWallets = () => {
  /**
   * An array containing user information and their crypto wallets.
   * @type {User[]}
   */
  const userWithWallet = useLoader();
  const router = useRouter();

  /**
   *
   * @param {React.SyntheticEvent} e
   * @param {string} currencyId
   * @returns {Promise<void>}
   */
  const sellACurrency = async (e, currencyId) => {
    e.preventDefault();
    try {
      const res = await sellCurrency(currencyId);
      if (res.status === 201) {
        router.invalidate();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const thead = (
    <>
      <Tr>
        <Th>Crypto-monnaie</Th>
        <Th>Quantité</Th>
        <Th>Vendre</Th>
      </Tr>
    </>
  );

  const tbody = (
    <>
      {userWithWallet[0].crypto_wallets.map((val) => {
        return (
          <Tr key={val.currency.id}>
            <Td>{val.currency.crypto_name}</Td>
            <Td>{val.quantity} </Td>
            <Td>
              <Button
                bg={"blue.500"}
                color={"white"}
                borderRadius={"6px"}
                onClick={(e) => sellACurrency(e, val.currency.id)}>
                Vendre
              </Button>
            </Td>
          </Tr>
        );
      })}
    </>
  );

  return (
    <>
      <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
        <CustomTable thead={thead} tbody={tbody} title={"Mon portefeuille"}></CustomTable>
      </Flex>
    </>
  );
};
