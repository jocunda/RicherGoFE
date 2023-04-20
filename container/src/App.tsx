import "./styles/index.scss";
import React from "react";
import { Route, useRoutes } from "react-router-dom";
import { routesConfig } from "./router/router.config";
import Component1 from "./Component1";
import Component2 from "./Component2";
import Component3 from "./Component3";
import Component4 from "./Component4";

let routes = {
  path: "comp1",
  async lazy() {
    let { Component1 } = await import("./Component1");
    return { Component: Component1 };
  },
  children: [
    {
      path: "comp2",
      async lazy() {
        let { Component2 } = await import("./Component2");
        return { Component: Component2 };
      },
    },
    {
      path: "comp3",
      async lazy() {
        let { Component3 } = await import(
          "./Component3"
        );
        return {
          Component: Component3,
        };
      },
    },
  ],
};


const App = () => {



  return (
    <>
      <h1>This is container</h1>
    </>
  );
};

export default App;



