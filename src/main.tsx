import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AppProvider from "store/index.tsx";
import "assets/styles/tailwind.scss";
import "assets/styles/global.scss";
import "assets/styles/font.scss";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AppProvider>,
);
