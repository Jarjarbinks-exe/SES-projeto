import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { router } from "./routing/router";

import { AuthProvider } from "./auth/AuthContext";

import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AuthProvider>
      <h1>WriteUP</h1>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);