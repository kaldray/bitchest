import { useSearch } from "@tanstack/react-router";
import { Button, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { purchaseRoute } from "@/router/route";

export const PurchaseCurrency = () => {
  const { currency_id, currency_name } = useSearch({ from: purchaseRoute.id });

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"center"} flexDir={"column"} mt={"5rem"}>
        <Text as={"h1"} my={"1rem"}>
          Sélectionner une quantité pour : {currency_name}
        </Text>
        <Flex
          p={"2rem"}
          border={"1px"}
          borderColor="gray.200"
          as={"form"}
          gap={"1rem"}
          flexDir={"column"}>
          <FormControl>
            <FormLabel>Quantité</FormLabel>
            <Input type={"number"} required={true} />
          </FormControl>
          <FormControl>
            <FormLabel>CurrencyId</FormLabel>
            <Input name={"email"} readOnly={true} value={currency_id} type="text" />
          </FormControl>
          <Button type={"submit"}>Acheter</Button>
        </Flex>
      </Flex>
    </>
  );
};
