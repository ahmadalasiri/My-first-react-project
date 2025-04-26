import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TodoList from "./components/TodoList";
import { TodosProvider } from "./contexts/todosContext";
import SnackbarProvider from "./components/Snackbar";
import { ToastProvider } from "./contexts/toastContext";
// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue color for primary buttons
    },
    success: {
      main: "#4caf50", // Green for check buttons
    },
    warning: {
      main: "#ff9800", // Orange for edit buttons
    },
    error: {
      main: "#f44336", // Red for delete buttons
    },
    background: {
      default: "#f5f5f5",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>
        <TodosProvider>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              bgcolor: "background.default",
              p: 2,
            }}
          >
            <TodoList />
            <SnackbarProvider />
          </Box>
        </TodosProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
