import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { BlogContextProvider } from "./ContextApi/BlogContext.jsx";
import "./index.css";
import routes from "./routes/routes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BlogContextProvider>
      <RouterProvider router={routes} />
      <Toaster/>
    </BlogContextProvider>
  </React.StrictMode>
);
