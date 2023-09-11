import { RootRoute, Route, Outlet, redirect } from "@tanstack/react-router";

import * as Pages from "@/pages/index.js";
import { Layout } from "@/components/Navigation/Layout";
import {
  getAllUsers,
  getCurrencies,
  getCurrencyRate,
  getUserById,
  getUsersCryptoWallet,
  getUserCryptoWalletDetail,
  isAuthenticated,
  getUserWallet,
} from "@/api/index.js";
import { router } from "@/router/index.js";
import { userStore } from "@/store/userStore.js";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import { Skeleton } from "@chakra-ui/react";

const { setState, getState } = userStore;

let rootRoute = new RootRoute();

const layout = new RootRoute({
  getParentRoute: () => unauthenticatedGuard,
  id: "layout",
  component: () => (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  ),
  loader: async ({ abortController }) => {
    try {
      if (getState().user === "client") {
        return getUserWallet(abortController);
      }
    } catch (e) {
      console.log(e, "root");
      throw redirect({
        to: "/",
      });
    }
  },
  wrapInSuspense: true,
  pendingComponent: () => (
    <>
      <Skeleton h={"100vh"} w={"250px"} />
    </>
  ),
});

const unauthenticatedGuard = new Route({
  id: "guard",
  getParentRoute: () => rootRoute,
  beforeLoad: async ({ search }) => {
    try {
      if (typeof getState().user === "string") return;
      const response = await isAuthenticated();
      setState({ user: response });
      if (response === "admin") {
        if (search?.redirect !== undefined) {
          return router.history.push(search.redirect);
        }
        router.navigate({ to: "admin", from: "/" });
      } else {
        if (search?.redirect !== undefined) {
          return router.history.push(search.redirect);
        }
        router.navigate({ to: "wallet", from: "/" });
      }
    } catch (e) {
      throw redirect({
        to: "/",
      });
    }
  },
});

const authenticatedGuard = new Route({
  getParentRoute: () => rootRoute,
  id: "authenticated",
  beforeLoad: async ({ search }) => {
    try {
      const response = await isAuthenticated();
      if (response === "admin") {
        setState({ user: response });
        if (search?.redirect !== undefined) {
          return router.history.push(search.redirect);
        }
        router.navigate({ to: "admin", from: "/" });
      } else {
        setState({ user: response });
        if (search?.redirect !== undefined) {
          return router.history.push(search.redirect);
        }
        router.navigate({ to: "wallet", from: "/" });
      }
    } catch (e) {
      return Pages.Login;
    }
  },
});

const loginRoute = new Route({
  getParentRoute: () => authenticatedGuard,
  path: "/",
  component: Pages.Login,
});
const adminRoute = new Route({
  getParentRoute: () => layout,
  path: "admin",
  component: () => (
    <>
      <Pages.Admin />
    </>
  ),
  loader: async ({ abortController }) => {
    return getAllUsers(abortController);
  },
  wrapInSuspense: true,
  pendingComponent: () => (
    <>
      <TableSkeleton skeletonHeight={"400px"} />
    </>
  ),
});
const updateUserRoute = new Route({
  getParentRoute: () => layout,
  path: "update-user/$id",
  loader: async ({ params: { id }, abortController }) => {
    return getUserById(id, abortController);
  },
  component: Pages.AdminUpdateUser,
  wrapInSuspense: true,
  pendingComponent: () => (
    <>
      <TableSkeleton skeletonHeight={"400px"} />
    </>
  ),
});
const createUserRoute = new Route({
  getParentRoute: () => layout,
  path: "create-user",
  component: Pages.AdminCreateUser,
});

const currenciesListRoute = new Route({
  getParentRoute: () => layout,
  path: "currencies",
  component: Pages.CurrenciesList,
  loader: async ({ abortController }) => {
    return getCurrencies(abortController);
  },
  wrapInSuspense: true,
  pendingComponent: () => (
    <>
      <TableSkeleton skeletonHeight={"600px"} />
    </>
  ),
});

const currencyRate = new Route({
  getParentRoute: () => layout,
  path: "currency/$id",
  component: Pages.CurrencyRate,
  loader: async ({ params: { id }, abortController }) => {
    return getCurrencyRate(id, abortController);
  },
  wrapInSuspense: true,
  pendingComponent: () => (
    <>
      <TableSkeleton skeletonHeight={"400px"} />
    </>
  ),
});

const purchaseRoute = new Route({
  getParentRoute: () => layout,
  path: "purchase",
  beforeLoad: async () => {
    if (getState().user === null) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: Pages.PurchaseCurrency,
  validateSearch: (search) => {
    console.log(typeof search.quoting);
    return {
      quoting: search.quoting,
      currency_id: search.currency_id,
      currency_name: search.currency_name,
    };
  },
});

const walletRoute = new Route({
  path: "wallet",
  getParentRoute: () => layout,
  component: Pages.UserWallets,
  loader: async ({ abortController }) => {
    return getUsersCryptoWallet(abortController);
  },
  wrapInSuspense: true,
  pendingComponent: () => (
    <>
      <TableSkeleton skeletonHeight={"300px"} />
    </>
  ),
});

const walletDetailRoute = new Route({
  getParentRoute: () => layout,
  path: "wallet/detail/$id",
  loader: async ({ params: { id }, abortController }) => {
    return getUserCryptoWalletDetail(id, abortController);
  },
  component: Pages.UserDetailWallet,
  wrapInSuspense: true,
  pendingComponent: ({ useMatch, useRouteContext }) => (
    <>
      <TableSkeleton
        skeletonHeight={"400px"}
        useMatch={useMatch}
        useRouteContext={useRouteContext}
      />
    </>
  ),
});

export {
  loginRoute,
  adminRoute,
  rootRoute,
  updateUserRoute,
  createUserRoute,
  currenciesListRoute,
  currencyRate,
  purchaseRoute,
  walletRoute,
  walletDetailRoute,
  layout,
  unauthenticatedGuard,
  authenticatedGuard,
};
