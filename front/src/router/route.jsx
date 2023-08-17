import { RootRoute, Route, Outlet, redirect } from "@tanstack/react-router";

import * as Pages from "@/pages/index.js";
import { Layout } from "@/components/Navigation/Layout";
import { isAuthenticated } from "@/api/index.js";
import { router } from "@/router/index.js";
import { userStore } from "@/store/userStore.js";

const { setState, getState } = userStore;

let rootRoute = new RootRoute({
  component: () => (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  ),
});

//
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Pages.Login,
  beforeLoad: async () => {
    try {
      const response = await isAuthenticated();
      if (response === "admin") {
        setState(response);
        router.navigate({ to: "admin" });
      } else {
        setState(response);
        router.navigate({ to: "client" });
      }
    } catch (err) {
      return Pages.Login;
    }
  },
});
const adminRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "admin",
  beforeLoad: async () => {
    if (getState().user === null) {
      throw redirect({
        to: "/",
      });
    }
    if (getState().user === "client") {
      throw redirect({
        to: "/client",
      });
    }
  },
});
const clientRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "client",
  beforeLoad: async () => {
    if (getState().user === null) {
      throw redirect({
        to: "/",
      });
    }
    if (getState().user === "admin") {
      throw redirect({
        to: "/admin",
      });
    }
  },
});

export { indexRoute, adminRoute, clientRoute, rootRoute };
