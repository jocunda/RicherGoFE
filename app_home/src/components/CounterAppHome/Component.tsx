import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

type AppHeaderProps = {
  count: number;
  onClear: () => void;
};

const AppHeader: React.FC<AppHeaderProps> = React.lazy(
  () => import("app_header/Header")
);

export default function CounterAppHome() {
  console.log("microfe component: CounterAppHome");
  const data = useLoaderData();
  console.log('CounterAppHome data: ', data);

  const [count, setCount] = useState<number>(0);
  return (
    <>
      <h1>React Home</h1>
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