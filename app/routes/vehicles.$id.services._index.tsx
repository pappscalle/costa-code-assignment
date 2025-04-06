import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  Link,
  useOutletContext,
  useRouteLoaderData,
  useSearchParams,
} from "react-router";
import type { DetailsAndServices, Service } from "~/types/types";
import ServicesTable from "~/components/ServicesTable";

const allStatuses = ["ACTIVE", "DEACTIVATED", "ERROR"];

export default function Services() {
  const data = useOutletContext<DetailsAndServices>();

  console.log("Services: ", data);

  const [searchParams, setSearchParams] = useSearchParams();

  const params = searchParams.getAll("status");
  const selectedStatuses = params.length ? params : allStatuses;

  console.log("Selected statuses: ", selectedStatuses);

  const { services } = data;

  const filteredServices = services.services.filter((service) => {
    return selectedStatuses.includes(service.status);
  });

  const communicationStatus = services.communicationStatus;

  return (
    <div>
      <Typography variant="h5">All Services</Typography>
      <FormGroup row>
        {allStatuses.map((status) => (
          <FormGroup key={status}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedStatuses.includes(status)}
                  onChange={(e) => {
                    const newStatuses = e.target.checked
                      ? [...selectedStatuses, status]
                      : selectedStatuses.filter((s) => s !== status);
                    setSearchParams({ status: newStatuses });
                  }}
                />
              }
              label={status}
            />
          </FormGroup>
        ))}
      </FormGroup>
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
