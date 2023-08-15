import { Router } from "@tanstack/react-router";
import { indexRoute, adminRoute, clientRoute, rootRoute } from "@/router/route";

const routeTree = rootRoute.addChildren([indexRoute, adminRoute, clientRoute]);

export const router = new Router({ routeTree });
