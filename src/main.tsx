import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ConfirmProvider } from "./context/ConfirmContext.tsx";
import { ToastProvider } from "./Components/common/toast/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfirmProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ConfirmProvider>
    </BrowserRouter>
  </StrictMode>
);
