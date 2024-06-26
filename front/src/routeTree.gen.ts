/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from "@tanstack/react-router"

// Import Routes

import { Route as rootRoute } from "./routes/__root"
import { Route as AuthenticatedImport } from "./routes/_authenticated"
import { Route as IndexImport } from "./routes/index"
import { Route as AuthenticatedLayoutImport } from "./routes/_authenticated/_layout"
import { Route as AuthenticatedLayoutWalletImport } from "./routes/_authenticated/_layout/wallet"
import { Route as AuthenticatedLayoutPurchaseImport } from "./routes/_authenticated/_layout/purchase"
import { Route as AuthenticatedLayoutCurrenciesImport } from "./routes/_authenticated/_layout/currencies"
import { Route as AuthenticatedLayoutAdminImport } from "./routes/_authenticated/_layout/_admin"
import { Route as AuthenticatedLayoutWalletIdImport } from "./routes/_authenticated/_layout/wallet_.$id"
import { Route as AuthenticatedLayoutCurrenciesCurrencyImport } from "./routes/_authenticated/_layout/currencies_.$currency"
import { Route as AuthenticatedLayoutAdminUsersImport } from "./routes/_authenticated/_layout/_admin/users"
import { Route as AuthenticatedLayoutAdminUsersUpdateIdImport } from "./routes/_authenticated/_layout/_admin/users_.update.$id"

// Create Virtual Routes

const AuthenticatedLayoutAdminUsersCreateLazyImport = createFileRoute(
  "/_authenticated/_layout/_admin/users/create",
)()

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: "/_authenticated",
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedLayoutRoute = AuthenticatedLayoutImport.update({
  id: "/_layout",
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedLayoutWalletRoute = AuthenticatedLayoutWalletImport.update({
  path: "/wallet",
  getParentRoute: () => AuthenticatedLayoutRoute,
} as any).lazy(() =>
  import("./routes/_authenticated/_layout/wallet.lazy").then((d) => d.Route),
)

const AuthenticatedLayoutPurchaseRoute =
  AuthenticatedLayoutPurchaseImport.update({
    path: "/purchase",
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import("./routes/_authenticated/_layout/purchase.lazy").then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutCurrenciesRoute =
  AuthenticatedLayoutCurrenciesImport.update({
    path: "/currencies",
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import("./routes/_authenticated/_layout/currencies.lazy").then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutAdminRoute = AuthenticatedLayoutAdminImport.update({
  id: "/_admin",
  getParentRoute: () => AuthenticatedLayoutRoute,
} as any)

const AuthenticatedLayoutWalletIdRoute =
  AuthenticatedLayoutWalletIdImport.update({
    path: "/wallet/$id",
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import("./routes/_authenticated/_layout/wallet_.$id.lazy").then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutCurrenciesCurrencyRoute =
  AuthenticatedLayoutCurrenciesCurrencyImport.update({
    path: "/currencies/$currency",
    getParentRoute: () => AuthenticatedLayoutRoute,
  } as any).lazy(() =>
    import("./routes/_authenticated/_layout/currencies_.$currency.lazy").then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutAdminUsersRoute =
  AuthenticatedLayoutAdminUsersImport.update({
    path: "/users",
    getParentRoute: () => AuthenticatedLayoutAdminRoute,
  } as any).lazy(() =>
    import("./routes/_authenticated/_layout/_admin/users.lazy").then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutAdminUsersCreateLazyRoute =
  AuthenticatedLayoutAdminUsersCreateLazyImport.update({
    path: "/users/create",
    getParentRoute: () => AuthenticatedLayoutAdminRoute,
  } as any).lazy(() =>
    import("./routes/_authenticated/_layout/_admin/users_.create.lazy").then(
      (d) => d.Route,
    ),
  )

const AuthenticatedLayoutAdminUsersUpdateIdRoute =
  AuthenticatedLayoutAdminUsersUpdateIdImport.update({
    path: "/users/update/$id",
    getParentRoute: () => AuthenticatedLayoutAdminRoute,
  } as any).lazy(() =>
    import(
      "./routes/_authenticated/_layout/_admin/users_.update.$id.lazy"
    ).then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    "/_authenticated": {
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    "/_authenticated/_layout": {
      preLoaderRoute: typeof AuthenticatedLayoutImport
      parentRoute: typeof AuthenticatedImport
    }
    "/_authenticated/_layout/_admin": {
      preLoaderRoute: typeof AuthenticatedLayoutAdminImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    "/_authenticated/_layout/currencies": {
      preLoaderRoute: typeof AuthenticatedLayoutCurrenciesImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    "/_authenticated/_layout/purchase": {
      preLoaderRoute: typeof AuthenticatedLayoutPurchaseImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    "/_authenticated/_layout/wallet": {
      preLoaderRoute: typeof AuthenticatedLayoutWalletImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    "/_authenticated/_layout/_admin/users": {
      preLoaderRoute: typeof AuthenticatedLayoutAdminUsersImport
      parentRoute: typeof AuthenticatedLayoutAdminImport
    }
    "/_authenticated/_layout/currencies/$currency": {
      preLoaderRoute: typeof AuthenticatedLayoutCurrenciesCurrencyImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    "/_authenticated/_layout/wallet/$id": {
      preLoaderRoute: typeof AuthenticatedLayoutWalletIdImport
      parentRoute: typeof AuthenticatedLayoutImport
    }
    "/_authenticated/_layout/_admin/users/create": {
      preLoaderRoute: typeof AuthenticatedLayoutAdminUsersCreateLazyImport
      parentRoute: typeof AuthenticatedLayoutAdminImport
    }
    "/_authenticated/_layout/_admin/users/update/$id": {
      preLoaderRoute: typeof AuthenticatedLayoutAdminUsersUpdateIdImport
      parentRoute: typeof AuthenticatedLayoutAdminImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AuthenticatedRoute.addChildren([
    AuthenticatedLayoutRoute.addChildren([
      AuthenticatedLayoutAdminRoute.addChildren([
        AuthenticatedLayoutAdminUsersRoute,
        AuthenticatedLayoutAdminUsersCreateLazyRoute,
        AuthenticatedLayoutAdminUsersUpdateIdRoute,
      ]),
      AuthenticatedLayoutCurrenciesRoute,
      AuthenticatedLayoutPurchaseRoute,
      AuthenticatedLayoutWalletRoute,
      AuthenticatedLayoutCurrenciesCurrencyRoute,
      AuthenticatedLayoutWalletIdRoute,
    ]),
  ]),
])

/* prettier-ignore-end */
