import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "#F5F1EB",
            paper: "#FFFFFF",
        },
        primary: {
            main: "#8FB9A8",
        },
        secondary: {
            main: "#E8E2D6",
        },
        text: {
            primary: "#2F3E3A",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
    },
});

export default theme;
