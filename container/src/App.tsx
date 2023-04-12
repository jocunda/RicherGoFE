import "./styles/index.scss";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import TestSub from "./components/TestSub";
import TestSub2 from "./components/TestSub/TestSub2";

interface AppHeaderProps {
  count: number;
  onClear: () => void;
}

const AppHome = React.lazy(() => import("app_home/CounterAppHome"));
const AppLogin = React.lazy(() => import("app_login/CounterAppLogin"));
const AppHeader: React.FC<AppHeaderProps> = React.lazy(() => import("app_header/Header"));


const App = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <AppHome />
            </React.Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <AppLogin />
            </React.Suspense>
          }
        />
        <Route path="/TestSub2" element={<TestSub2 />} />
        <Route
          path="/"
          element={
            <h1>
              This is container <Link to="/login">click</Link>
              <Link to="/home">home</Link>
            </h1>
          }
        />
      </Routes>
      <React.Suspense fallback={<div>Loading...</div>}>
        <AppHome />
      </React.Suspense>
      <React.Suspense fallback={<div>Loading...</div>}>
        <AppLogin />
      </React.Suspense>

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
      <TestSub />
      layer0
    </>
  );
};

export default App;
