import { Flex, Td, Th, Tr } from "@chakra-ui/react";
import { useLoader } from "@tanstack/react-router";
import { CustomTable } from "@/components/table/table";

/**
 * @typedef {Object} CryptoWallet
 * @property {number} quantity - La quantité de crypto-monnaie dans le portefeuille.
 * @property {string} created_at - La date de création du portefeuille au format "JJ-MM-AAAA".
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

  const thead = (
    <>
      <Tr>
        <Th>Crypto-monnaie</Th>
        <Th>Date d&apos;achat</Th>
        <Th>Quantité</Th>
        <Th>Bénéfices</Th>
      </Tr>
    </>
  );

  const tbody = (
    <>
      {userDetailedWallet[0].crypto_wallets.map((val) => {
        return (
          <Tr key={val.currency.id}>
            <Td>{val.currency.crypto_name}</Td>
            <Td>{val.created_at}</Td>
            <Td>{val.quantity}</Td>
            <Td>{val.capital_gain ?? 0}</Td>
          </Tr>
        );
      })}
    </>
  );

  return (
    <>
      <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
        <CustomTable
          thead={thead}
          tbody={tbody}
          title={"Voici le détail de vos achats."}></CustomTable>
      </Flex>
    </>
  );
};
