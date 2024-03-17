import { getAllUsers } from "@/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout/_admin/users")({
  loader: async ({ abortController }) => {
    return getAllUsers(abortController);
  },
});
