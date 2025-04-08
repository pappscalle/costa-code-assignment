import {
  Box,
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
import { Link, useOutletContext, useSearchParams } from "react-router";
import type { DetailsAndServices, Service, ServiceList } from "~/types/types";
import ServicesTable from "~/components/ServicesTable";
import { useMemo } from "react";

const allStatuses = ["ACTIVE", "DEACTIVATED", "ERROR"];

export default function Services() {
  const services = useOutletContext<ServiceList>();

  console.log("Services: ", services);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedStatuses = useMemo(() => {
    const params = searchParams.getAll("status");
    return params.length ? params : allStatuses;
  }, [searchParams]);

  console.log("Selected statuses: ", selectedStatuses);

  const filteredServices = useMemo(() => {
    return services.services?.filter((service) =>
      selectedStatuses.includes(service.status)
    );
  }, [services, selectedStatuses]);

  const communicationStatus = services.communicationStatus;

  return (
    <Box>
      <Typography variant="h5">All Services</Typography>
      <FormGroup row>
        {allStatuses.map((status) => (
          <FormControlLabel
            key={status}
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
    </Box>
  );
}
