import { Link, useRouteLoaderData } from "react-router";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { type Vehicle, type VehicleList } from "~/types";

export default function Vehicles() {
  const data = useRouteLoaderData<VehicleList>("routes/vehicles");

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        The list of vehicles
      </Typography>
      <Stack spacing={2}>
        {data?.vehicles.map(({ id, name = "Unknown Vehicle" }: Vehicle) => (
          <Card key={id}>
            <Link to={`/vehicles/${id}`}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {name}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    {id}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
