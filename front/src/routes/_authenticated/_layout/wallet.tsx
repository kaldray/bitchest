import { getUsersCryptoWallet } from "@/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout/wallet")({
  loader: async ({ abortController }) => {
    return getUsersCryptoWallet(abortController);
  },
  wrapInSuspense: true,
});
