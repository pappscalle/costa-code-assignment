import {
  Link,
  Outlet,
  useLoaderData,
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

// export interface Vehicle {
//   msidn: string;
//   engineStatus: string;
//   brand: string;
//   countryOfOperation: string;
//   chassisNumber: string;
//   cassisSeries: string;
// }

// export interface Service {
//   serviceName: string;
//   status: string;
//   lastUpdate: string;
// }

// export interface ServiceList {
//   communicationStatus: string;
//   services: Service[];
// }

// export interface LoaderResponse {
//   id: string;
//   details: Vehicle;
//   services: ServiceList;
// }

// export async function loader({ params }: LoaderFunctionArgs) {
//   const vehicleDetails = await fetch(
//     `http://localhost:1337/vehicle/info?id=${params.id}`
//   );

//   const vehicleServices = await fetch(
//     `http://localhost:1337/vehicle/services?id=${params.id}`
//   );

//   if (!vehicleDetails.ok || !vehicleServices.ok) {
//     throw new Response("Failed to load data", {
//       status: 500,
//     });
//   }

//   const details: Vehicle = await vehicleDetails.json();
//   const services: ServiceList = await vehicleServices.json();

//   console.log("Services: ", services.services);

//   const combinedData = {
//     id: params.id,
//     details,
//     services,
//   };
//   console.log("Data loaded successfully");
//   console.log("Vehicle: ", combinedData);
//   return combinedData;
// }

export default function Vehicle() {
  //const { id, details, services } = useLoaderData<LoaderResponse>();

  const { id, details, services } = useRouteLoaderData("routes/vehicles.$id");

  const { vehicles } = useRouteLoaderData("routes/vehicles");

  const vehicle = vehicles.find((vehicle: Vehicle) => vehicle.id === id);
  const name = vehicle?.name || "* UNKNOWN *";

  return (
    <div>
      <Typography variant="h5">Vehicle Information</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{name}</TableCell>
            </TableRow>
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
