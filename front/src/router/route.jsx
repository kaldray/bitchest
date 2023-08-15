import { RootRoute, Route, Outlet } from "@tanstack/react-router";
import * as Pages from "@/pages/index.js";
import { Layout } from "@/components/Navigation/Layout";

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
});
const adminRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "admin",
});
const clientRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "client",
});

export { indexRoute, adminRoute, clientRoute, rootRoute };
