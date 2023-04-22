import { createBrowserRouter } from "react-router-dom";
import { createLoader, createProtectedLoader } from "../apis";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        loader: createLoader(() => import("app_home/CounterAppHome")),
        lazy: () => import("app_home/CounterAppHome"),
      },
      {
        path: "user",
        children: [
          {
            path: "",
            loader: createProtectedLoader(() => import("app_user/AppUser")),
            lazy: () => import("app_user/AppUser"),
          },
          {
            path: "reset",
            loader: createProtectedLoader(
              () => import("app_user/ResetPasswordForm")
            ),
            lazy: () => import("app_user/ResetPasswordForm"),
          },
        ],
      },
      {
        path: "login",
        loader: createLoader(() => import("app_login/CounterAppLogin")),
        lazy: () => import("app_login/CounterAppLogin"),
      },
    ],
  },
]);

export { router };
