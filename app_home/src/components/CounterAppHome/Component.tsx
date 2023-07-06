import React, {
  // useState
} from "react";
import { useLoaderData } from "react-router-dom";
// import { Button } from "@fluentui/react-components";
// import {
//   AddCircle24Regular
// } from "@fluentui/react-icons";

// type AppHeaderProps = {
//   count: number;
//   onClear: () => void;
// };

// const AppHeader: React.FC<AppHeaderProps> = React.lazy(
//   () => import("app_header/AppHeader")
// );

export default function CounterAppHome() {
  const data = useLoaderData();
  console.log('CounterAppHome data: ', data);
  // const [count, setCount] = useState<number>(0);
  return (
    <>
      <h1>React Home</h1>
      {/* <React.Suspense fallback={<div>Loading...</div>}>
        <AppHeader count={count} onClear={() => setCount(0)} />
      </React.Suspense>
      <div>Count: {count}</div>
      <div>
        <Button
          icon={<AddCircle24Regular />}
          size="large"
          onClick={() => setCount(count + 1)}
        >Add to Cart</Button>
      </div> */}
    </>
  );
}; 