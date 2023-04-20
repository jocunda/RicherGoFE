
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import { createRoot } from 'react-dom/client';


const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        async lazy() {
          let CounterAppHome = await import("app_home/CounterAppHome");
          return { Component: CounterAppHome.default };
        }
      },
      {
        path: "user",
        children: [
          {
            path: "",
            async lazy() {
              let CounterAppLogin = await import("app_login/CounterAppLogin");
              return { Component: CounterAppLogin.default };
            },
          },
          {
            path: "reset",
            async lazy() {
              let ResetPasswordForm = await import("app_user/ResetPasswordForm");
              return { Component: ResetPasswordForm.default };
            },
          },
        ],
      },
      {
        path: "comp2",
        children: [
          {
            path: "",
            async lazy() {
              let { Component2 } = await import("./Component2");
              return { Component: Component2 };
            },
          },
          {
            path: "comp3",
            async lazy() {
              let { Component3 } = await import("./Component3");
              return { Component: Component3 };
            },
          },
        ],
      },
    ],
  },
  {
    path: "home",
    async lazy() {
      let CounterAppHome = await import("app_home/CounterAppHome");
      return { Component: CounterAppHome.default };
    },
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);