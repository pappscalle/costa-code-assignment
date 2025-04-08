import {
  Link,
  useLoaderData,
  type LoaderFunctionArgs,
  type MetaArgs,
} from "react-router";

import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

export function meta({}: MetaArgs) {
  return [
    { title: "Costa: Code Assignment" },
    { name: "description", content: "Welcome to Start page!" },
  ];
}

export default function Index() {
  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Welcome to the Costa: Code Assignment!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quis
        rerum cum, vel quam tempora iste, impedit fuga, explicabo eveniet
        nostrum quae obcaecati exercitationem vitae officiis quod saepe quasi
        tempore.
      </Typography>
    </Box>
  );
}
