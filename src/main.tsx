import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/index.tsx";
import "./styles/index.css";
import { AuthProvider } from "./utils/contexts/auth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
