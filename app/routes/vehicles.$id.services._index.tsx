import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useOutletContext, useRouteLoaderData } from "react-router";
import type { LoaderResponse, Service } from "./vehicles.$id";

export default function Services() {
  const data = useOutletContext<LoaderResponse>();

  console.log("Services: ", data);

  const { services } = data;

  return (
    <div>
      <Typography variant="h5">All Services</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {services.communicationStatus == "ACTIVE" &&
              services.services.map((service: Service) => (
                <TableRow key={service.serviceName}>
                  <TableCell>{service.serviceName}</TableCell>
                  <TableCell>{service.status}</TableCell>
                  <TableCell>{service.lastUpdate}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button component={Link} to=".." variant="contained" color="primary">
        Back to vehicle Information
      </Button>
    </div>
  );
}
