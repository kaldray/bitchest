import { Router } from "@tanstack/react-router";
import {
  loginRoute,
  rootRoute,
  adminRoute,
  updateUserRoute,
  createUserRoute,
  currenciesListRoute,
  currencyRate,
  purchaseRoute,
  walletRoute,
  walletDetailRoute,
  authenticatedGuard,
  layout,
} from "@/router/route";

const routeTree = rootRoute.addChildren([
  loginRoute,
  authenticatedGuard.addChildren([
    layout.addChildren([
      adminRoute,
      updateUserRoute,
      createUserRoute,
      currenciesListRoute,
      currencyRate,
      purchaseRoute,
      walletRoute,
      walletDetailRoute,
    ]),
  ]),
]);

export const router = new Router({ routeTree, defaultPreload: "intent" });
