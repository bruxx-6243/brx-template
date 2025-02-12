import React from "react";
import ReactDOM from "react-dom/client";

import "@/index.css";

import { App } from "@/app";
import Providers from "@/providers";
import { Toaster } from "react-hot-toast";

const rootElement = document.getElementById("app-root")!;

/**
 * Initializes and renders the React application.
 *
 * - Ensures that the app is only rendered if the root element is empty.
 * - Uses `ReactDOM.createRoot` for concurrent rendering.
 * - Wraps the application with global `Providers` for state management and configurations.
 * - Includes `Toaster` for handling toast notifications.
 */
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Providers>
        <App />
        <Toaster />
      </Providers>
    </React.StrictMode>,
  );
}
