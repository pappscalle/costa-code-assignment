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
import type { DetailsAndServices, Service } from "./vehicles.$id";
import type { Vehicle } from "./vehicles";
import Services from "./vehicles.$id.services._index";
import ServicesTable from "~/components/ServicesTable";
import InformationTable from "~/components/InformationTable";

export default function Vehicle() {
  const { id, services, details } = useOutletContext<DetailsAndServices>();

  const filteredServices = services.services?.filter(
    (service: Service) => service.status == "ACTIVE"
  );
  const communicationStatus = services.communicationStatus;

  return (
    <div>
      <Stack spacing={2} marginBottom={4}>
        <Typography variant="h5">Vehicle Information</Typography>
        <InformationTable details={details} />
      </Stack>
      <Stack spacing={2} marginBottom={4}>
        <Typography variant="h5">Active Services</Typography>
        <ServicesTable
          services={filteredServices}
          communicationStatus={communicationStatus}
        />
      </Stack>

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
