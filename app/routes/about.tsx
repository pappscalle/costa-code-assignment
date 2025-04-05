import { Link } from "react-router";
import type { Route } from "../+types/root";
import { Button, Container, Typography } from "@mui/material";

export default function About() {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        This is the about page
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quis
        rerum cum, vel quam tempora iste, impedit fuga, explicabo eveniet
        nostrum quae obcaecati exercitationem vitae officiis quod saepe quasi
        tempore.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Home
      </Button>
    </Container>
  );
}
