import { createFileRoute } from "@tanstack/react-router";

type PurchaseSearch = {
  ch_id: string;
  quoting: string;
  currency_name: string;
};

export const Route = createFileRoute("/_authenticated/_layout/purchase")({
  validateSearch: (search: Record<string, unknown>): PurchaseSearch => {
    return {
      ch_id: String(search.ch_id),
      quoting: String(search.quoting),
      currency_name: String(search.currency_name),
    };
  },
});
