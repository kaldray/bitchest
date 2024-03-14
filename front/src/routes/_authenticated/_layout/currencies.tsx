import { getCurrencies } from "@/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout/currencies")({
  loader: async ({ abortController }) => {
    return getCurrencies(abortController);
  },
});
