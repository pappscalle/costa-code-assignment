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
import { Link, useOutletContext, useRouteLoaderData } from "react-router";
import type { LoaderResponse, Service } from "./vehicles.$id";
import ServicesTable from "~/components/ServicesTable";

export default function Services() {
  const data = useOutletContext<LoaderResponse>();

  console.log("Services: ", data);

  const { services } = data;

  const filteredServices = services.services;
  const communicationStatus = services.communicationStatus;

  return (
    <div>
      <Typography variant="h5">All Services</Typography>
      <ServicesTable
        services={filteredServices}
        communicationStatus={communicationStatus}
      />
      <Stack direction="row" spacing={2} marginTop={2}>
        <Button component={Link} to=".." variant="contained" color="primary">
          Back to vehicle Information
        </Button>
      </Stack>
    </div>
  );
}
