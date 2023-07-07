import React from "react";
import {
  RouterProvider,
} from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { router } from "./router/router.config";
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
// import App from "./App";


const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);


root.render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </FluentProvider>
  </React.StrictMode>
);