import { getUserById } from "@/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout/_admin/users/update/$id")({
  loader: async ({ params, abortController }) => {
    return getUserById(params.id, abortController);
  },
});
