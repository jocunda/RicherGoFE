import { createBrowserRouter } from "react-router-dom";
import { createLoader, createProtectedLoader } from "@mimo/utilities";
import React from "react";


const AppError = React.lazy(() => import("app_error/AppError").then(({ AppError }) => ({ default: AppError }))); // export  { AppError };
//const AppError = React.lazy(() => import("app_error/AppError")); // export  { AppError };/


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <AppError />,
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
            children: [
              {
                path: "reset",
                loader: createProtectedLoader(
                  () => import("app_user/ResetPasswordForm")
                ),
                lazy: () => import("app_user/ResetPasswordForm"),
              },
              {
                path: "",
                loader: createProtectedLoader(
                  () => import("app_login/AppRegister")
                ),
                lazy: () => import("app_login/AppRegister"),
              },
              {
                path: "setting",
                loader: createProtectedLoader(
                  () => import("app_login/AppRegister")
                ),
                lazy: () => import("app_login/AppRegister"),
              },
            ]
          },
        ],
      },
      {
        path: "login",
        loader: createLoader(() => import("app_login/CounterAppLogin")),
        lazy: () => import("app_login/CounterAppLogin"),
        errorElement: <AppError />,
      },
      {
        path: "register",
        loader: createLoader(() => import("app_login/AppRegister")),
        lazy: () => import("app_login/AppRegister"),
        errorElement: <AppError />,
      },
    ],
  },
]);

export { router };
