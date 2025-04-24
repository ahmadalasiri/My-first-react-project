import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Box from "@mui/material/Box";

export default function TodoList() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center" }}>
      <Card>
        <CardContent>
          <Typography gutterBottom>My Todo List</Typography>
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
        </CardContent>
      </Card>
    </Container>
  );
}
