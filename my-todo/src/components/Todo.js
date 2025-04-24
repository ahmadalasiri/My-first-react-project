import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTodos } from "../contexts/todosContext";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Todo({ todo }) {
  const { todos, setTodos } = useTodos();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDetails, setEditDetails] = useState(todo.description || "");

  function handleTodoComplete() {
    setTodos(
      todos.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function handleSaveEdit() {
    setTodos(
      todos.map((t) =>
        t.id === todo.id
          ? {
              ...t,
              title: editTitle,
              description: editDetails,
            }
          : t
      )
    );
    setOpenEditDialog(false);
  }

  function handleOpenEditDialog() {
    setEditTitle(todo.title);
    setEditDetails(todo.description || "");
    setOpenEditDialog(true);
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

          {/* Edit Todo Dialog */}
          <Dialog
            open={openEditDialog}
            onClose={() => setOpenEditDialog(false)}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle
              sx={{
                pb: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              Edit Task
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setOpenEditDialog(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Title
                </Typography>
                <TextField
                  fullWidth
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Details
                </Typography>
                <TextField
                  fullWidth
                  value={editDetails}
                  onChange={(e) => setEditDetails(e.target.value)}
                  variant="outlined"
                  multiline
                  rows={4}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
                />
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={() => setOpenEditDialog(false)}
                color="error"
                sx={{ fontWeight: "bold", borderRadius: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveEdit}
                sx={{ fontWeight: "bold", borderRadius: 1 }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>

          <Button
            variant="contained"
            onClick={handleOpenEditDialog}
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

          {/* Delete dialog */}
          <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle
              sx={{
                pb: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              Delete Task
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setOpenDeleteDialog(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <DialogContentText>
                Are you sure you want to delete this task?
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={() => setOpenDeleteDialog(false)}
                sx={{ fontWeight: "bold", borderRadius: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setTodos(todos.filter((t) => t.id !== todo.id));
                  setOpenDeleteDialog(false);
                }}
                sx={{ fontWeight: "bold", borderRadius: 1 }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenDeleteDialog(true)}
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
