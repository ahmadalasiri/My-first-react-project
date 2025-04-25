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
// Todo component
import Todo from "./Todo";

export default function TodoList() {
  const { todos, setTodos } = useTodos();

  const [filter, setFilter] = useState("ALL");
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), title: newTodo, description: "", completed: false },
    ];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setNewTodo("");
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

  return (
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
              <ToggleButton value="ALL" aria-label="all todos" sx={{ flex: 1 }}>
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
              filteredTodos.map((todo) => <Todo key={todo.id} todo={todo} />)
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
  );
}
