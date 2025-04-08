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
  console.log("1. Component Render");

  const outletServices = useOutletContext<ServiceList>();
  console.log("2. Got outlet context");

  const servicesRef = useRef<ServiceList | null>(null);

  if (!servicesRef.current) {
    console.log("3. Caching outlet services");
    servicesRef.current = outletServices;
  }

  const cachedServices = servicesRef.current;

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedStatuses = useMemo(() => {
    const params = searchParams.getAll("status");
    return params.length ? params : allStatuses;
  }, [searchParams]);

  const filteredServices = useMemo(() => {
    return cachedServices?.services?.filter((service) =>
      selectedStatuses.includes(service.status)
    );
  }, [cachedServices, selectedStatuses]);

  if (!cachedServices) return <div>Loading...</div>; // fallback

  const communicationStatus = cachedServices.communicationStatus;

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
