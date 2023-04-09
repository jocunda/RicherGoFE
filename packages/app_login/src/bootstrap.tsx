import App from "./App"
import React from "react";

import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);