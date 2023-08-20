import { Router } from "@tanstack/react-router";
import {
  indexRoute,
  adminRoute,
  clientRoute,
  rootRoute,
  updateUserRoute,
  createUserRoute,
} from "@/router/route";

const routeTree = rootRoute.addChildren([
  indexRoute,
  adminRoute,
  clientRoute,
  updateUserRoute,
  createUserRoute,
]);

export const router = new Router({ routeTree });
