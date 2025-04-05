import {
  Link,
  Outlet,
  type LoaderFunctionArgs,
  type MetaArgs,
} from "react-router";

import { Alert, Button, Container, Typography } from "@mui/material";

export function meta({}: MetaArgs) {
  return [
    { title: "Costa: Code Assignment" },
    { name: "description", content: "Welcome to Start page!" },
  ];
}

export async function loader({}: LoaderFunctionArgs) {
  const result = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!result.ok) {
    throw new Response("Failed to load data", { status: result.status });
  }
  console.log("Data loaded successfully");
  return result.json();
}

export default function Index() {
  console.log("Home component rendered");
  return <div>The landing page</div>;
}
