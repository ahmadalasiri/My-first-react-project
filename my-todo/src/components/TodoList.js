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
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
// Todo component
import Todo from "./Todo";

const todos = [
  {
    id: uuidv4(),
    title: "Read a book",
    description: "Read a book about React",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Buy a new phone",
    description: "Buy a new phone with 128GB of storage",
    completed: true,
  },
  {
    id: uuidv4(),
    title: "Go to the gym",
    description: "Go to the gym and lift weights",
    completed: false,
  },
];

export default function TodoList() {
  const todosJsx = todos.map((todo) => <Todo key={todo.id} todo={todo} />);
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center" }}>
      <Card>
        <CardContent>
          <Typography gutterBottom>My Todo List</Typography>
          <Divider />
          {/* Filter buttons */}
          <Box sx={{ mt: 2 }}>
            <ToggleButtonGroup
              // value={alignment}
              exclusive
              // onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="left" aria-label="left aligned">
                All
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                Active
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                Completed
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {todosJsx}
          <Grid container spacing={2}>
            <Grid size={10}>
              <TextField label="Add Todo" />
            </Grid>
            <Grid size={2}>
              <Button variant="contained" color="primary">
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
