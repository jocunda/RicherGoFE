import React, { Suspense } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import type { RouteProps } from "./router.config";

export function renderRoutes(routes: RouteProps[], isProtected: boolean) {
  const { userName, isAuth } = useAuth();
  console.log(routes);
  debugger

  const AppHome = React.lazy(() => import("app_home/CounterAppHome"));
  const AppLogin = React.lazy(() => import("app_login/CounterAppLogin"));
  const AppUser = React.lazy(() => import("app_user/AppUser"));
  const ResetPasswordForm = React.lazy(
    () => import("app_user/ResetPasswordForm")
  );

  //check auth
  const [previousProtectedPath, setPreviousProtectedPath] = React.useState("");

  return routes.map(({ path, component, isProtected, nestedRoutes }) => {
    const routePath = isProtected ? path : `${path}`;
    const children = nestedRoutes ? renderRoutes(nestedRoutes, isProtected) : undefined;

    return (
      <Route
        key={path}
        path={routePath}
        element={
          isProtected ? (
            isAuth ? (
              <Suspense fallback={<div>Loading...</div>}>
                {component && React.createElement(component, null, children)}
              </Suspense>
            ) : (
              <Navigate
                to="/login"
                replace
                state={{ from: previousProtectedPath }}
              />
            )
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              {component && React.createElement(component, null, children)}
            </Suspense>
          )
        }
      />
    );
  });
}