import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import AuthenticationPage from "./routes/login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthMiddleware from "./components/auth-middleware";
import { CookiesProvider } from "react-cookie";
import DocPage from "./routes/Document";
import DocumentsPage from "./routes/main";
import api from "./lib/api";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/docs/:id",
        element: <DocPage />,
        loader: async ({ params }) => {
          const { id } = params;
          if (!id) return redirect("/");
          try {
            const res = await api.get(`/docs/${id}`);
            const data = res.data;
            if (data.status === "success") {
              return data.data;
            }
            return redirect("/");
          } catch (err) {
            console.log(err);
            return redirect("/");
          }
        },
      },
      {
        path: "/",
        element: <DocumentsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthenticationPage />,
    // loader: authLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <AuthMiddleware>
            <RouterProvider router={router} />
          </AuthMiddleware>
        </QueryClientProvider>
      </CookiesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
