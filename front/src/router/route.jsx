import { RootRoute, Route, Outlet, redirect } from "@tanstack/react-router";

import * as Pages from "@/pages/index.js";
import { Layout } from "@/components/Navigation/Layout";
import {
  getAllUsers,
  getCurrencies,
  getCurrencyRate,
  getUserById,
  isAuthenticated,
} from "@/api/index.js";
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
  beforeLoad: async ({ search }) => {
    try {
      const response = await isAuthenticated();
      if (response === "admin") {
        setState({ user: response });
        if (search?.redirect !== null) {
          return router.history.push(search.redirect);
        }
        router.navigate({ to: "admin" });
      } else {
        setState({ user: response });
        if (search?.redirect !== null) {
          return router.history.push(search.redirect);
        }
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
  component: () => (
    <>
      <Pages.Admin />
    </>
  ),
  loader: async () => {
    const res = await getAllUsers();
    return res;
  },
  beforeLoad: async () => {
    if (getState().user === null) {
      throw redirect({
        to: "/",
      });
    }
  },
});
const updateUserRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "update-user/$id",
  loader: async ({ params: { id } }) => {
    const res = await getUserById(id);
    return res;
  },
  beforeLoad: async () => {
    if (getState().user === null) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: Pages.AdminUpdateUser,
});
const createUserRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "create-user",
  component: Pages.AdminCreateUser,
  beforeLoad: async () => {
    if (getState().user === null) {
      throw redirect({
        to: "/",
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
const currenciesListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "currencies",
  component: Pages.CurrenciesList,
  beforeLoad: async () => {
    if (getState().user === null) {
      throw redirect({
        to: "/",
        search: {
          redirect: router.state.location.href,
        },
      });
    }
  },
  loader: async () => {
    return await getCurrencies();
  },
});

const currencyRate = new Route({
  getParentRoute: () => rootRoute,
  path: "currency/$id",
  component: Pages.CurrencyRate,
  beforeLoad: async () => {
    if (getState().user === null) {
      throw redirect({
        to: "/",
        search: {
          redirect: router.state.location.href,
        },
      });
    }
  },
  loader: async ({ params: { id } }) => {
    return await getCurrencyRate(id);
  },
});

export {
  indexRoute,
  adminRoute,
  clientRoute,
  rootRoute,
  updateUserRoute,
  createUserRoute,
  currenciesListRoute,
  currencyRate,
};
