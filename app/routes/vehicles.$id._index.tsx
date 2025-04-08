import { Await, Link, useRouteLoaderData } from "react-router";

import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import type { Service, ServiceList, VehicleInformation } from "~/types/types";
import type { Vehicle } from "~/types/types";
import ServicesTable from "~/components/ServicesTable";
import InformationTable from "~/components/InformationTable";
import { Suspense } from "react";

export default function Vehicle() {
  const { id, services, details } = useRouteLoaderData("routes/vehicles.$id");

  const filteredServices = services.services?.filter(
    (service: Service) => service.status == "ACTIVE"
  );

  const communicationStatus = services.communicationStatus;

  return (
    <div>
      <Stack spacing={2} marginBottom={4}>
        <Typography variant="h5">Vehicle Information</Typography>

        <Suspense fallback={<CircularProgress />}>
          <Await resolve={details}>
            {(resolvedDetails: VehicleInformation) => (
              <InformationTable details={resolvedDetails} />
            )}
          </Await>
        </Suspense>
      </Stack>

      <Stack spacing={2} marginBottom={4}>
        <Typography variant="h5">Active Services</Typography>

        <Suspense fallback={<CircularProgress />}>
          <Await resolve={services}>
            {(resolvedServices: ServiceList) => {
              const filteredServices = resolvedServices.services?.filter(
                (service) => service.status === "ACTIVE"
              );
              return (
                <ServicesTable
                  services={filteredServices}
                  communicationStatus={resolvedServices.communicationStatus}
                />
              );
            }}
          </Await>
        </Suspense>
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
