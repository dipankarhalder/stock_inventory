import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./routers";
import { Toaster } from "@/components/ui/sonner";

const rootapp = document.getElementById("root");
createRoot(rootapp!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);
