import "../styles/index.scss"
import React, { lazy } from "react"
import { Routes, Route } from "react-router-dom";
import { ContainerApp } from "./containerApp/index";

const AppHome = lazy(() => import("app_home/AppHome"));
const AppLogin = lazy(() => import("app_login/AppLogin"));

const App = () => {
  return <>
    <Routes>
      <Route
        path="/"
        element={
          <ContainerApp
            AppHome={AppHome}
            AppLogin={AppLogin}
          />
        }
      />
      <Route path="app1/*" element={<AppHome />} />
      <Route path="app2/*" element={<AppLogin />} />
    </Routes>

  </>
}

export default App