import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import { useTodos } from "../contexts/todosContext";
import Divider from "@mui/material/Divider";
import { useToast } from "../contexts/toastContext";
export default function Todo({ todo, showDeleteDialog, handleOpenEditDialog }) {
  const { todos, setTodos } = useTodos();
  const { setOpen, setMessage, setSeverity } = useToast();
  function handleTodoComplete() {
    const newTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    if (!todo.completed) {
      setMessage("Todo completed successfully");
      setSeverity("success");
      setOpen(true);
    }
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
          px: 0.5,
        }}
      >
        <Typography
          sx={{
            textAlign: "left",
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "text.secondary" : "text.primary",
          }}
        >
          {todo.title}
        </Typography>

        {/* <Typography
          sx={{
            textAlign: "left",
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "text.secondary" : "text.primary",
          }}
        >
          {todo.description}
        </Typography> */}

        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Button
            onClick={handleTodoComplete}
            variant="contained"
            color="success"
            size="small"
            sx={{
              minWidth: 0,
              p: 1,
              borderRadius: 0.5,
            }}
          >
            <CheckIcon fontSize="small" />
          </Button>

          <Button
            variant="contained"
            onClick={() => handleOpenEditDialog(todo)}
            color="warning"
            size="small"
            sx={{
              minWidth: 0,
              p: 1,
              borderRadius: 0.5,
            }}
          >
            <EditIcon fontSize="small" />
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => showDeleteDialog(todo)}
            size="small"
            sx={{
              minWidth: 0,
              p: 1,
              borderRadius: 0.5,
            }}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}
