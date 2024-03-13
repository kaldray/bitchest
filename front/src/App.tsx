import { RouterProvider } from "@tanstack/react-router";
import { ChakraProvider } from "@chakra-ui/react";

import { router } from "@/router";
import React from "react";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : React.lazy(() =>
      // Lazy load in development
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })),
    );

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <>
      <ChakraProvider>
        <RouterProvider router={router} />
        <TanStackRouterDevtools router={router} />
      </ChakraProvider>
    </>
  );
}

export default App;
