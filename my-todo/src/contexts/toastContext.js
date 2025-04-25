import React, { createContext, useState, useContext } from "react";

// Create a context for the toast
const ToastContext = createContext();

// Custom hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  return context;
};

// Provider component
export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  // Create the value object
  const value = {
    open,
    setOpen,
    message,
    setMessage,
    severity,
    setSeverity,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
