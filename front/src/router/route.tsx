// const layout = new RootRoute({
//   getParentRoute: () => unauthenticatedGuard,
//   id: "layout",
//   component: () => {
//     return (
//       <>
//         <Layout>
//           <Outlet />
//         </Layout>
//       </>
//     );
//   },
//   loader: async ({ abortController }) => {
//     try {
//       if (getState().user === "client") {
//         return getUserWallet(abortController);
//       }
//     } catch (e) {
//       console.log(e, "root");
//       throw redirect({
//         to: "/",
//       });
//     }
//   },
//   wrapInSuspense: true,
//   pendingComponent: () => (
//     <>
//       <Skeleton h={"100vh"} w={"250px"} />
//     </>
//   ),
// });



// const loginRoute = new Route({
//   getParentRoute: () => authenticatedGuard,
//   path: "/",
//   component: lazyRouteComponent(() => import("@/pages"), "Login"),
// });
// const adminRoute = new Route({
//   getParentRoute: () => layout,
//   path: "admin",
//   component: lazyRouteComponent(() => import("@/pages"), "Admin"),
//   loader: async ({ abortController }) => {
//     return getAllUsers(abortController);
//   },
//   wrapInSuspense: true,
//   pendingComponent: () => (
//     <>
//       <TableSkeleton skeletonHeight={"400px"} />
//     </>
//   ),
// });
// const updateUserRoute = new Route({
//   getParentRoute: () => layout,
//   path: "update-user/$id",
//   loader: async ({ params: { id }, abortController }) => {
//     return getUserById(id, abortController);
//   },
//   component: lazyRouteComponent(() => import("@/pages"), "AdminUpdateUser"),
//   wrapInSuspense: true,
//   pendingComponent: () => (
//     <>
//       <TableSkeleton skeletonHeight={"400px"} />
//     </>
//   ),
// });
// const createUserRoute = new Route({
//   getParentRoute: () => layout,
//   path: "create-user",
//   component: lazyRouteComponent(() => import("@/pages"), "AdminCreateUser"),
// });

