import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import ErrorShow from "@/components/shared/ErrorShow";
import Home from "@/pages/public/Home";
import Register from "@/pages/auth/Register";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/auth/Login";
import AllPostPage from "@/pages/public/AllPostPage";
import Post from "@/pages/public/Post";

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
      {
        path: "/post",
        children: [
          {
            index: true,
            element: <AllPostPage />,
          },
          {
            path: ":postId",
            element: <Post />,
          },
        ],
      },
    ],
  },
]);

export default route;
