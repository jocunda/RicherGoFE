import React from "react";
import {
  RouterProvider,
} from "react-router-dom";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { router } from "./router/router.config";


const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>
);