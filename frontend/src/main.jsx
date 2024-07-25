import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/assets/styles/global.css";
import AuthContextProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
