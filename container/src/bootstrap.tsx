import App from "./App"
import React, { Suspense } from "react";
import {
  createBrowserRouter,
  IndexRouteObject,
  LazyRouteFunction,
  RouterProvider,

} from "react-router-dom";
import { createRoot } from 'react-dom/client';


const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);

// const AppHome = React.lazy(() => import("app_home/CounterAppHome"));
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppHome />,
//     children: [
//       {
//         path: "comp2",
//         lazy: () => import("./Component2"),
//         children: [
//           {
//             path: "comp3",
//             lazy: (() => (import("./Component3"))) as LazyRouteFunction<IndexRouteObject>,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: "comp4",
//     lazy: (() => (import("./Component4"))) as LazyRouteFunction<IndexRouteObject>,
//   },
// ]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
);