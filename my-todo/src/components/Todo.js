import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
export default function Todo() {
  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Grid container spacing={2}>
          <Grid size={8}>
            <Typography>Todo</Typography>
          </Grid>
          {/* action buttons */}
          <Grid size={4}>
            <Button variant="contained" color="success">
              <CheckIcon />
            </Button>
            <Button variant="contained" color="warning">
              <EditIcon />
            </Button>
            <Button variant="contained" color="error">
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
        <Divider />
      </CardContent>
    </Card>
  );
}
