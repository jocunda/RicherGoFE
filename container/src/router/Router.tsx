import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import routes from "./router.config";

const AppLogin = React.lazy(() => import("app_login/CounterAppLogin"));

const ComponentWrapper = ({ component: Component }: any) => <Component />;
const Router = () => {
  const { isAuth } = useAuth();

  console.log("Auth: ", isAuth); //check auth

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.auth && !isAuth ? //if not auth user required to login
              <React.Suspense fallback={<div>Loading...</div>}>
                <AppLogin />
              </React.Suspense>
              :
              <React.Suspense fallback={<div>Loading...</div>}>
                <ComponentWrapper component={route.component} />
              </React.Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default Router;
