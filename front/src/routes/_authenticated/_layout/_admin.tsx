import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { userStore } from "@/store/userStore";

const { getState } = userStore;

export const Route = createFileRoute("/_authenticated/_layout/_admin")({
  beforeLoad: async () => {
    if (getState().user !== "admin") {
      throw redirect({
        to: "/",
      });
    }
    return <Outlet />;
  },
});
