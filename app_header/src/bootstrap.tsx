import App from "./App"
import React from "react";

import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

root.render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      <RouterProvider router={router} />
    </FluentProvider>
  </React.StrictMode>
);