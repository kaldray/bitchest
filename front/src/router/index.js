import { Router } from "@tanstack/react-router";
import { indexRoute, adminRoute, clientRoute, rootRoute, updateUserRoute } from "@/router/route";

const routeTree = rootRoute.addChildren([indexRoute, adminRoute, clientRoute, updateUserRoute]);

export const router = new Router({ routeTree });
