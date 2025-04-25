import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { useEffect, useMemo } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useTodos } from "../contexts/todosContext";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useToast } from "../contexts/toastContext";

// Todo component
import Todo from "./Todo";

export default function TodoList() {
  const { setOpen, setMessage, setSeverity } = useToast();
  const { todos, setTodos } = useTodos();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [editTitle, setEditTitle] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), title: newTodo, description: "", completed: false },
    ];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setNewTodo("");
    setMessage("Todo added successfully");
    setSeverity("success");
    setOpen(true);
  };

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  // Filter todos based on current filter
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "ALL") return true;
      if (filter === "ACTIVE") return !todo.completed;
      if (filter === "COMPLETED") return todo.completed;
      return true;
    });
  }, [todos, filter]);

  useEffect(() => {
    const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(initialTodos);
  }, []);

  const showDeleteDialog = (todo) => {
    setOpenDeleteDialog(true);
    setDialogTodo(todo);
  };
  function handleSaveEdit() {
    const newTodos = todos.map((t) =>
      t.id === dialogTodo.id
        ? {
            ...t,
            title: editTitle,
            description: editDetails,
          }
        : t
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setOpenEditDialog(false);
  }

  function handleOpenEditDialog(todo) {
    setEditTitle(todo.title || "");
    setEditDetails(todo.description || "");
    setDialogTodo(todo);
    setOpenEditDialog(true);
  }

  return (
    <>
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
              const newTodos = todos.filter((t) => t.id !== dialogTodo.id);
              setTodos(newTodos);
              localStorage.setItem("todos", JSON.stringify(newTodos));
              setOpenDeleteDialog(false);
            }}
            sx={{ fontWeight: "bold", borderRadius: 1 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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

      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          py: 4,
          height: "100%",
        }}
      >
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            overflow: "visible",
            display: "flex",
            flexDirection: "column",
            maxHeight: "80vh",
          }}
        >
          <CardContent
            sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 500,
                mb: 2,
              }}
            >
              My Todo List
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Filter buttons */}
            <Box sx={{ mb: 3 }}>
              <ToggleButtonGroup
                value={filter}
                exclusive
                aria-label="todo filter"
                onChange={handleFilterChange}
                size="small"
                sx={{
                  width: "70%",
                  "& .MuiToggleButton-root": {
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                  },
                }}
              >
                <ToggleButton
                  value="ALL"
                  aria-label="all todos"
                  sx={{ flex: 1 }}
                >
                  ALL
                </ToggleButton>
                <ToggleButton
                  value="ACTIVE"
                  aria-label="active todos"
                  sx={{ flex: 1 }}
                >
                  ACTIVE
                </ToggleButton>
                <ToggleButton
                  value="COMPLETED"
                  aria-label="completed todos"
                  sx={{ flex: 1 }}
                >
                  COMPLETED
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Todo list */}
            <Box
              sx={{
                mb: 3,
                maxHeight: "300px",
                minHeight: "200px",
                overflowY: "auto",
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "rgba(0,0,0,0.05)",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: "10px",
                  "&:hover": {
                    background: "rgba(0,0,0,0.3)",
                  },
                },
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: 1,
                p: 1,
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    showDeleteDialog={showDeleteDialog}
                    handleOpenEditDialog={handleOpenEditDialog}
                  />
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    py: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  No todos to display in this category
                </Typography>
              )}
            </Box>

            {/* Add todo form */}
            <Box sx={{ mt: 3, px: 1 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    onChange={(e) => setNewTodo(e.target.value)}
                    label="Add Todo"
                    value={newTodo}
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    onClick={handleAddTodo}
                    variant="contained"
                    color="primary"
                    disabled={newTodo.trim() === ""}
                    fullWidth
                    sx={{
                      borderRadius: 1,
                      py: 1,
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    ADD
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
