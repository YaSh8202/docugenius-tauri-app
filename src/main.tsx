import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { ThemeProvider } from "@/components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { rootLoader } from "./routes/root";
import ErrorPage from "./routes/error-page";
import AuthenticationPage, { loader as authLoader } from "./routes/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [{}],
    loader: rootLoader,
  },
  {
    path: "/login",
    element: <AuthenticationPage />,
    loader: authLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
