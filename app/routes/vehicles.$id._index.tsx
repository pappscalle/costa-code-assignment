import {
  Link,
  Outlet,
  useLoaderData,
  useOutletContext,
  useRouteLoaderData,
  type LoaderFunctionArgs,
} from "react-router";

import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import type { LoaderResponse, Service } from "./vehicles.$id";
import type { Vehicle } from "./vehicles";

export default function Vehicle() {
  const { id, services, details } = useOutletContext<LoaderResponse>();

  // const { vehicles } = useRouteLoaderData("routes/vehicles");
  //
  // const vehicle = vehicles.find((vehicle: Vehicle) => vehicle.id === id);
  // const name = vehicle?.name || "* UNKNOWN *";

  return (
    <div>
      <Typography variant="h5">Vehicle Information</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {/* <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{name}</TableCell>
            </TableRow> */}
            <TableRow>
              <TableCell>MSIDN</TableCell>
              <TableCell>{details.msidn}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Engine Status</TableCell>
              <TableCell>{details.engineStatus}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell>{details.brand}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Country of Operation</TableCell>
              <TableCell>{details.countryOfOperation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Chassis Number</TableCell>
              <TableCell>{details.chassisNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cassis Series</TableCell>
              <TableCell>{details.cassisSeries}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5">Active Services</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {services.communicationStatus == "ACTIVE" &&
              services.services
                .filter((service: Service) => service.status == "ACTIVE")
                .map((service: Service) => (
                  <TableRow key={service.serviceName}>
                    <TableCell>{service.serviceName}</TableCell>
                    <TableCell>{service.status}</TableCell>
                    <TableCell>{service.lastUpdate}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={2} marginTop={2}>
        <Button component={Link} to=".." variant="contained" color="primary">
          Back to vehicle list
        </Button>

        <Button
          component={Link}
          to={`/vehicles/${id}/services`}
          variant="contained"
          color="primary"
        >
          Show all available services
        </Button>
      </Stack>
    </div>
  );
}
