import "./styles/index.scss";
import React, { useState } from "react";
import Router from "./router/Router";


interface AppHeaderProps {
  count: number;
  onClear: () => void;
}


const AppHeader: React.FC<AppHeaderProps> = React.lazy(
  () => import("app_header/Header")
);



const App = () => {
  const [count, setCount] = useState<number>(0);


  return (
    <>
      <Router />
      <h1>This is container</h1>
      <React.Suspense fallback={<div>Loading...</div>}>
        <AppHeader count={count} onClear={() => setCount(0)} />
      </React.Suspense>
      <div>Count: {count}</div>
      <div>
        <button onClick={() => setCount(count + 1)}>Add to cart</button>
      </div>
    </>
  );
};

export default App;
