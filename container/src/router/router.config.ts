import React from "react";

const AppHome = React.lazy(() => import("app_home/CounterAppHome"));
const AppLogin = React.lazy(() => import("app_login/CounterAppLogin"));
const AppUser = React.lazy(() => import("app_user/AppUser"));
const ResetPasswordForm = React.lazy(
  () => import("app_user/ResetPasswordForm")
);

type RouteProps = {
  path: string;
  element: React.ComponentType;
  auth: boolean;
  children?: RouteProps[];
};

const routes: RouteProps[] = [
  {
    path: "/",
    element: AppLogin,
    auth: false,
  },
  {
    path: "/login",
    element: AppLogin,
    auth: false,
  },
  {
    path: "/user",
    element: AppUser,
    auth: true,
    children: [
      {
        path: "/reset",
        element: ResetPasswordForm,
        auth: true,
      },
    ],
  },
  {
    path: "/home",
    element: AppHome,
    auth: true,
  },
];

export default routes;
