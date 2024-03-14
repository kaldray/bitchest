import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { userStore } from "@/store/userStore";

const { getState } = userStore;

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    if (getState().user === null) {
      throw redirect({
        to: "/",
      });
    }
    return <Outlet />;
  },
});
