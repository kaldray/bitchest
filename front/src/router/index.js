import { Router } from "@tanstack/react-router";
import {
  indexRoute,
  adminRoute,
  clientRoute,
  rootRoute,
  updateUserRoute,
  createUserRoute,
  curreniesListRoute,
} from "@/router/route";

const routeTree = rootRoute.addChildren([
  indexRoute,
  adminRoute,
  clientRoute,
  updateUserRoute,
  createUserRoute,
  curreniesListRoute,
]);

export const router = new Router({ routeTree });
