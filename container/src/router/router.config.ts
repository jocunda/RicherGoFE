import { Suspense } from "react";
import { RouteObject } from "react-router-dom";

const AppHome = React.lazy(() => import("app_home/CounterAppHome"));
const AppLogin = React.lazy(() => import("app_login/CounterAppLogin"));
const AppUser = React.lazy(() => import("app_user/AppUser"));
const ResetPasswordForm = React.lazy(
  () => import("app_user/ResetPasswordForm")
);

// 定义路由配置
export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: (<></>
      <Suspense fallback={<div>Loading...</div>}>
        <AppHome/>
      </Suspense>
    ),
    children: [
      {
        path: "login",
        lazy: () => import("app_login/CounterAppLogin"),
      },
      {
        path: "user",
        lazy: () => import("app_user/AppUser"),
        children: [
          {
            path: "reset",
            lazy: () => import("app_user/ResetPasswordForm"),
          },
        ],
      },
    ],
  },
  {
    path: "/home",
    lazy: () => import("app_home/CounterAppHome"),
  },
];
