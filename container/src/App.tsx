import "./styles/index.scss";
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

interface AppHeaderProps {
  count: number;
  onClear: () => void;
}

const AppHome = React.lazy(() => import("app_home/CounterAppHome"));
const AppLogin = React.lazy(() => import("app_login/CounterAppLogin"));
const AppHeader: React.FC<AppHeaderProps> = React.lazy(() => import("app_header/Header"));

const ProtectedRoute = ({ redirect, children }: any) => {
  if (redirect) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

const App = () => {
  const [count, setCount] = useState<number>(0);
  const { isAuth } = useAuth();

  console.log("Auth: ", isAuth);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <AppLogin />
            </React.Suspense>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute redirect={!isAuth}>
              <React.Suspense fallback={<div>Loading...</div>}>
                <AppHome />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>

      <h1>This is container</h1>
      <React.Suspense fallback={<div>Loading...</div>}>
        <AppHeader count={count} onClear={() => setCount(0)} />
      </React.Suspense>
      <div>Count: {count}</div>
      <div>
        <button
          onClick={() => setCount(count + 1)}>
          Add to cart
        </button>
      </div>
    </>
  );
};

export default App;
