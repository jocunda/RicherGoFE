import App from "./App"
import React from "react";
import {
    RouterProvider,
    createBrowserRouter
} from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

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