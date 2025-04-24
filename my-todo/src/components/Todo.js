import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import { useTodos } from "../contexts/todosContext";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";

export default function Todo({ todo }) {
  const { todos, setTodos } = useTodos();
  const [open, setOpen] = useState(false);
  function handleTodoComplete() {
    setTodos(
      todos.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
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

          {/* Delete dialog  */}
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Delete Todo</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this todo?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setTodos(todos.filter((t) => t.id !== todo.id));
                  setOpen(false);
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Button
            variant="contained"
            color="error"
            onClick={() => setOpen(true)}
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
