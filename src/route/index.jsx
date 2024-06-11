import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { RouterProvider } from "react-router-dom";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const HomePage = lazy(() => import("../pages/Homepage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
