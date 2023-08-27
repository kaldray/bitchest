import { useRouter, useSearch } from "@tanstack/react-router";
import { Button, Flex, FormControl, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { purchaseRoute } from "@/router/route";
import { purchaseCurrency } from "@/api";
import { useState } from "react";

export const PurchaseCurrency = () => {
  const { currency_id, currency_name } = useSearch({ from: purchaseRoute.id });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const toast = useToast({
    duration: 5000,
    position: "top",
  });

  const makePurchase = async (e) => {
    e.preventDefault();
    const target = e.target;
    const payload = {
      quantity: target.quantity.value,
      currency_id: target.currency_id.value,
    };
    try {
      const response = await purchaseCurrency(payload);
      if (response.status === 201) {
        setSuccess(true);
        router.invalidate();
        router.navigate({ to: "/currencies", from: "/" });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"center"} flexDir={"column"} mt={"5rem"}>
        {success &&
          toast({
            title: "Achat effectuer.",
            description: "Nous avons pris en compte votre achat.",
            status: "success",
            onCloseComplete: () => setSuccess(false),
          })}
        {error !== null &&
          toast({
            title: "Une erreur est survenue.",
            description: error,
            status: "error",
            onCloseComplete: () => setError(null),
          })}
        <Text as={"h1"} my={"1rem"}>
          Sélectionner une quantité pour : {currency_name}
        </Text>
        <Flex
          p={"2rem"}
          border={"1px"}
          borderColor="gray.200"
          as={"form"}
          gap={"1rem"}
          flexDir={"column"}
          onSubmit={(e) => makePurchase(e)}>
          <FormControl>
            <FormLabel>Quantité</FormLabel>
            <Input type={"number"} required={true} name={"quantity"} />
          </FormControl>
          <FormControl>
            <FormLabel>CurrencyId</FormLabel>
            <Input name={"currency_id"} readOnly={true} value={currency_id} type="text" />
          </FormControl>
          <Button type={"submit"}>Acheter</Button>
        </Flex>
      </Flex>
    </>
  );
};
