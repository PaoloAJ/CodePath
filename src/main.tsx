import React, { StrictMode } from "react";
import ReactDom, { createRoot } from "react-dom/client";
import "@picocss/pico/css/pico.min.css";
import "./index.css";
import App from "./App.tsx";
import EditCreators from "./pages/EditCreators.tsx";
import AddCreators from "./pages/AddCreators.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add",
    element: <AddCreators />,
  },
  {
    path: "/edit/:id",
    element: <EditCreators />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
