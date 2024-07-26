import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import ErrorShow from "@/components/shared/ErrorShow";
import Home from "@/pages/public/Home";
import Register from "@/pages/auth/Register";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/auth/Login";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorShow />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: (
          <AuthLayout>
            <Register />
          </AuthLayout>
        ),
      },
      {
        path: "login",
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        ),
      },
    ],
  },
]);

export default route;
