import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import App from "./App";
import theme from "./theme/theme";
import { AuthProvider } from "./auth/AuthProvider";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AuthProvider>
                <App />
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
