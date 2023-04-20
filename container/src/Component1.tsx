import React from "react";
import { Outlet } from "react-router-dom";

function Component1() {
  return <>app
    <Outlet />
  </>;
}

export { Component1 };
