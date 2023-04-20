import React, { useState } from "react";

type AppHeaderProps = {
  count: number;
  onClear: () => void;
};

const AppHeader: React.FC<AppHeaderProps> = React.lazy(
  () => import("app_header/Header")
);

const Counter = () => {
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

export default Counter;
