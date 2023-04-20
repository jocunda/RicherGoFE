import React from "react";
import { IndexRouteObject, Outlet } from "react-router-dom";

function Component2() {
  return <>login
    <Outlet />
  </>;
}
const indexRouteObject: IndexRouteObject = {
  Component: Component2,
  index: true
};
export default indexRouteObject;
