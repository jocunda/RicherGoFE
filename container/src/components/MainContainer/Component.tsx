import React, { useState } from "react";
import {
  Button,
} from "@fluentui/react-components";
import {
  AddCircle24Regular,

} from "@fluentui/react-icons";



const AppHeader = React.lazy(() => import("app_header/AppHeader").then(({ AppHeader }) => ({ default: AppHeader })));


export default function MainContainer() {
  const [count, setCount] = useState<number>(0);
  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        <AppHeader count={count} onClear={() => setCount(0)} />
      </React.Suspense>
      <div>Count: {count}</div>
      <div>
        <Button
          icon={<AddCircle24Regular />}
          size="large"
          onClick={() => setCount(count + 1)}
        >Add to Cart</Button>
      </div>
    </>
  );
}; 