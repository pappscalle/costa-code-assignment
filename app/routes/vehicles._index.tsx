import {
  Link,
  Outlet,
  useLoaderData,
  useOutletContext,
  useRouteLoaderData,
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
import { type Vehicle, type VehicleList } from "./vehicles";

export default function Vehicles() {
  const data = useOutletContext<VehicleList>();

  console.log("Vehiclesasd: ", data);

  return (
    <Container>
      <Stack spacing={2}>
        {data.vehicles.map(({ id, name = "* Unknown *" }: Vehicle) => (
          <Card key={id} sx={{ maxWidth: 450 }}>
            <Link to={`/vehicles/${id}`}>
              <CardActionArea>
                <CardContent>
                  {id}: {name}
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
