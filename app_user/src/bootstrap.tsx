import App from "./App"
import React from "react";

import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import ResetPasswordForm from "./components/ResetPasswordForm/Component";

const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <ResetPasswordForm />,
            },
        ]
    },
]);

root.render(
    <React.StrictMode>
        <FluentProvider theme={teamsLightTheme}>
            <RouterProvider router={router} />
        </FluentProvider>
    </React.StrictMode>
);