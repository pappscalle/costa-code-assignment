import { CircularProgress } from "@mui/material";
import { Suspense, useState } from "react";
import { Await, Outlet, useRouteLoaderData } from "react-router";
import ErrorAlert from "~/components/ErrorAlert";
import type { DetailsAndServices, ServiceList } from "~/types";

export default function Services() {
  const { services } = useRouteLoaderData("routes/vehicles.$id");

  const [cachedServices, setCachedServices] = useState<ServiceList | null>(
    null
  );

  return (
    <Suspense fallback={<CircularProgress />}>
      <Await
        errorElement={<ErrorAlert message="Error loading services" />}
        resolve={services}
      >
        {(resolvedServices) => {
          if (!cachedServices) {
            setCachedServices(resolvedServices);
          }
          return <Outlet context={cachedServices ?? resolvedServices} />;
        }}
      </Await>
    </Suspense>
  );
}
