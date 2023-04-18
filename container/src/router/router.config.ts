import React from "react";

type AppHeaderProps = {
  count: number;
  onClear: () => void;
};

const AppHome = React.lazy(() => import("app_home/CounterAppHome"));
const AppLogin = React.lazy(() => import("app_login/CounterAppLogin"));
const AppHeader: React.FC<AppHeaderProps> = React.lazy(
  () => import("app_header/Header")
);

type RouteProps = {
  path: string;
  component: any;
  auth: boolean;
};

const routes: RouteProps[] = [
  {
    path: "/",
    component: AppLogin,
    auth: false,
  },
  {
    path: "/header",
    component: AppHeader,
    auth: true,
  },
  {
    path: "/home",
    component: AppHome,
    auth: true,
  },
];

export default routes;
