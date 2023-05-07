import { Box, Container, TextField } from "@mui/material";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

const themeOptions: ThemeOptions = {
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

export const ContainerStyle = styled(Container)({
  color: mainTheme.palette.text.primary,
  backgroundColor: mainTheme.palette.background.default,
  marginTop: "1rem",
  borderRadius: "2rem",
  padding: "1rem",
});
