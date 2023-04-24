import { createBrowserRouter } from "react-router-dom";
import { createLoader, createProtectedLoader } from "@mimo/utilities";

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
      {
        path: "error",
        loader: createLoader(() => import("app_error/AppError")),
        lazy: () => import("app_error/AppError"),
      },
    ],
  },
]);

export { router };
