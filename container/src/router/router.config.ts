import React from "react";

type AppHeaderProps = {
  count: number;
  onClear: () => void;
};

const AppHome = React.lazy(() => import("app_home/CounterAppHome"));

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
