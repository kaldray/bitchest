import { useState, type FormEvent } from "react";
import { useRouter } from "@tanstack/react-router";
import { Button, Flex, FormControl, FormLabel, Input, Text, useToast } from "@chakra-ui/react";

import { purchaseRoute } from "@/router/route";

export class ErrorResponse extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Error Response";
  }
}

export const PurchaseCurrency = () => {
  const { currency_name, quoting, ch_id } = purchaseRoute.useSearch();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const toast = useToast({
    duration: 5000,
    position: "top",
  });

  interface ExtendedTarget extends EventTarget {
    quantity?: {
      value: string;
    };
  }

  const makePurchase = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target: ExtendedTarget = e.target;
    if (target.quantity == null) {
      throw new Error("Missing required params");
    }
    const payload = {
      quantity: target.quantity.value,
      currency_histories_id: ch_id,
    };
    try {
      const lazyLoading = await import("@/api/index");
      const response = await lazyLoading.purchaseCurrency(payload);
      if (response.status === 201) {
        setSuccess(true);
        router.invalidate();
        router.navigate({ to: "/currencies", from: "/" });
      }
    } catch (err) {
      if (err instanceof ErrorResponse) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
        height={"100%"}
        mt={["5rem", "5rem", "0rem"]}>
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
          Sélectionner une quantité pour :{" "}
          <span style={{ fontWeight: "700" }}>{currency_name}</span>
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
            <FormLabel>Cours actuel</FormLabel>
            <Input type={"text"} disabled={true} name={"quoting"} value={quoting + " €"} />
          </FormControl>
          <FormControl>
            <FormLabel>Quantité</FormLabel>
            <Input type={"number"} required={true} name={"quantity"} />
          </FormControl>
          <Button type={"submit"}>Acheter</Button>
        </Flex>
      </Flex>
    </>
  );
};
