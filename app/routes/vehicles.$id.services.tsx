import { CircularProgress } from "@mui/material";
import { Suspense, useState } from "react";
import { Await, Outlet, useRouteLoaderData } from "react-router";
import type { DetailsAndServices, ServiceList } from "~/types/types";
export default function Services() {
  const { services } = useRouteLoaderData("routes/vehicles.$id");

  const [cachedServices, setCachedServices] = useState<ServiceList | null>(
    null
  );

  return (
    <Suspense fallback={<CircularProgress />}>
      <Await resolve={services}>
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
