import { getCurrencyRate } from "@/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout/currencies/$currency")({
  loader: async ({ abortController, params }) => getCurrencyRate(params.currency, abortController),
  wrapInSuspense: true,
});
