import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useReducer } from "react";
import todosReducer from "../reducers/todosReducer";
import { useToast } from "../contexts/toastContext";

export default function Todo({ todo, showDeleteDialog, handleOpenEditDialog }) {
  const { setOpen, setMessage, setSeverity } = useToast();
  const [todos, dispatch] = useReducer(
    todosReducer,
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const handleTodoComplete = () => {
    const newTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    dispatch({
      type: "UPDATE_TODO",
      payload: { ...newTodos.filter((t) => t.id === todo.id) },
    });
    if (!todo.completed) {
      setMessage("Todo completed successfully");
      setSeverity("success");
      setOpen(true);
    }
  };

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
