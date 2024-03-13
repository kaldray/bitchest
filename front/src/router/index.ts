//@ts-nocheck
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
  unauthenticatedGuard,
  layout,
  authenticatedGuard,
} from "@/router/route";

const routeTree = rootRoute.addChildren([
  authenticatedGuard.addChildren([loginRoute]),
  unauthenticatedGuard.addChildren([
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

export const router = new Router(routeTree);
