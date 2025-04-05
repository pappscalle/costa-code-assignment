import {
  Link,
  useLoaderData,
  type LoaderFunctionArgs,
  type MetaArgs,
} from "react-router";

import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
interface Vehicle {
  id: number;
  name?: string;
}

interface VehicleList {
  vehicles: Vehicle[];
}

export async function loader({}: LoaderFunctionArgs) {
  const result = await fetch("http://localhost:1337/vehicle/list");
  if (!result.ok) {
    throw new Response("Failed to load data", { status: result.status });
  }

  const data: VehicleList = await result.json();

  console.log("Data loaded successfully");
  return data;
}

export default function Vehicles() {
  const { vehicles } = useLoaderData<VehicleList>();

  console.log("Vehicles: ", vehicles);

  return (
    <Stack spacing={2}>
      {vehicles.map(({ id, name }: Vehicle) => (
        <Card key={id} sx={{ maxWidth: 450 }}>
          <Link to={`/vehicle/${id}`}>
            <CardActionArea>
              <CardContent>
                {id}: {name}
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      ))}
    </Stack>
  );
}
