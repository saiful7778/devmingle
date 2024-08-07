import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import ErrorShow from "@/components/shared/ErrorShow";
import Home from "@/pages/public/Home";
import Register from "@/pages/auth/Register";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/auth/Login";
import AllPostPage from "@/pages/public/AllPostPage";
import Post from "@/pages/public/Post";
import ForgetPassword from "@/pages/auth/ForgetPassword";
import AuthProtector from "@/layouts/protector/AuthProtector";
import AllAnnouncement from "@/pages/public/AllAnnouncement";
import PrivateProtector from "@/layouts/protector/PrivateProtector";
import DashboardLayout from "@/layouts/DashboardLayout";

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
          <AuthProtector>
            <AuthLayout>
              <Register />
            </AuthLayout>
          </AuthProtector>
        ),
      },
      {
        path: "login",
        element: (
          <AuthProtector>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </AuthProtector>
        ),
      },
      {
        path: "forget_password",
        element: (
          <AuthLayout>
            <ForgetPassword />
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
      {
        path: "/announcement",
        element: <AllAnnouncement />,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <ErrorShow />,
    element: (
      <PrivateProtector>
        <DashboardLayout />
      </PrivateProtector>
    ),
    // children: [
    //   {
    //     path: "profile",
    //     element: <UserProfile />,
    //   },
    // ]
  },
]);

export default route;
