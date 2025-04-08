import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useOutletContext, useSearchParams } from "react-router";
import type { ServiceList } from "~/types/types";
import ServicesTable from "~/components/ServicesTable";
import { useMemo, useRef } from "react";

const allStatuses = ["ACTIVE", "DEACTIVATED", "ERROR"];

export default function Services() {
  const outletServices = useOutletContext<ServiceList>();

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedStatuses = useMemo(() => {
    const params = searchParams.getAll("status");
    return params.length ? params : allStatuses;
  }, [searchParams]);

  const filteredServices = useMemo(() => {
    return outletServices?.services?.filter((service) =>
      selectedStatuses.includes(service.status)
    );
  }, [outletServices, selectedStatuses]);

  const communicationStatus = outletServices.communicationStatus;

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
