import { getUserCryptoWalletDetail } from "@/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout/wallet/$id")({
  loader: async ({ params: { id }, abortController }) => {
    return getUserCryptoWalletDetail(id, abortController);
  },
  wrapInSuspense: true,
});
