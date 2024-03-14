import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ChakraProvider } from "@chakra-ui/react";

import { routeTree } from "./routeTree.gen";

export const router = createRouter({ routeTree, defaultStaleTime: Infinity });

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
      </ChakraProvider>
    </>
  );
}

export default App;
