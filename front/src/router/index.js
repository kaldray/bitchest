import { Router } from "@tanstack/react-router";
import {
  indexRoute,
  adminRoute,
  clientRoute,
  rootRoute,
  updateUserRoute,
  createUserRoute,
  currenciesListRoute,
  currencyRate,
  purchaseRoute,
  walletRoute,
} from "@/router/route";

const routeTree = rootRoute.addChildren([
  indexRoute,
  adminRoute,
  clientRoute,
  updateUserRoute,
  createUserRoute,
  currenciesListRoute,
  currencyRate,
  purchaseRoute,
  walletRoute,
]);

export const router = new Router({ routeTree });
