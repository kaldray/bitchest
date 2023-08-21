import { useLoader } from "@tanstack/react-router";

export const CurrencyRate = () => {
  const currencyRate = useLoader();
  console.log(currencyRate);
  return <div>CurrencyRate</div>;
};
