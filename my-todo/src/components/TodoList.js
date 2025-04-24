import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
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
    setTodos([
      ...todos,
      { id: uuidv4(), title: newTodo, description: "", completed: false },
    ]);
    setNewTodo("");
  };

  const todosJsx = todos.map((todo) => <Todo key={todo.id} todo={todo} />);

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

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
        }}
      >
        <CardContent sx={{ p: 3 }}>
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
              onChange={handleFilterChange}
              aria-label="todo filter"
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
          <Box sx={{ mb: 3 }}>{todosJsx}</Box>

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
                  value={newTodo}
                  variant="contained"
                  color="primary"
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
