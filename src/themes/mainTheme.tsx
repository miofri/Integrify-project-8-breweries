import { ThemeOptions, createTheme } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#ff9800",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#121212",
      paper: "#121212",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.7)",
      disabled: "rgba(255,255,255,0.5)",
    },
    divider: "rgba(255,255,255,0.13)",
  },
};

export const mainTheme = createTheme(themeOptions);
