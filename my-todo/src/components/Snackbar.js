import React from "react";
import { Snackbar, Alert } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import { useToast } from "../contexts/toastContext";

export default function CustomSnackbar() {
  const { open, message, severity, setOpen } = useToast();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const getIcon = () => {
    switch (severity) {
      case "success":
        return <CheckCircleIcon />;
      case "error":
        return <ErrorIcon />;
      case "warning":
        return <WarningIcon />;
      case "info":
        return <InfoIcon />;
      default:
        return <CheckCircleIcon />;
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        icon={getIcon()}
        severity={severity}
        onClose={handleClose}
        sx={{
          width: "100%",
          alignItems: "center",
          borderRadius: 1,
          ...(severity === "success" && {
            backgroundColor: "#4caf50",
            color: "white",
            "& .MuiAlert-icon": {
              color: "white",
            },
          }),
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
