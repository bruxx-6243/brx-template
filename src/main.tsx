import React from "react";
import ReactDOM from "react-dom/client";

import "@/index.css";

import { App } from "@/app";
import Providers from "@/providers";

const rootElement = document.getElementById("app-root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Providers>
        <App />
      </Providers>
    </React.StrictMode>
  );
}
