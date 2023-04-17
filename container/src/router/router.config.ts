import React from "react";

const AppHome = React.lazy(() => import("app_home/CounterAppHome"));
const AppLogin = React.lazy(() => import("app_login/CounterAppLogin"));


interface RouteProps {
    path: string;
    component: React.FC;
    auth?: boolean;
  }

const routes: RouteProps[] = [
  {
    path: '/',
    component: AppLogin,
  },
  {
    path: '/home',
    component: AppHome,
    auth: true,
  },
];

export default routes;