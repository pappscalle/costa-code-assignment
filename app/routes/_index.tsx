import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Button, Container, Typography } from "@mui/material";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Costa: Code Assignment" },
    { name: "description", content: "Welcome to Start page!" },
  ];
}

export default function Home() {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        This is the start page
      </Typography>
      <Button component={Link} to="/about" variant="outlined" color="primary">
        About
      </Button>
    </Container>
  );
}
