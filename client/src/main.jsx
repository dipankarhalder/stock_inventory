import "./styles/global.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import { ToastProvider } from "./context/toastContaxt";

const core = document.getElementById("root");
createRoot(core).render(
  <StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </StrictMode>
);
