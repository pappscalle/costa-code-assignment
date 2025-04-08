import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import {
  Await,
  Outlet,
  useLoaderData,
  useOutletContext,
  useRouteLoaderData,
} from "react-router";
import type { DetailsAndServices } from "~/types/types";

export default function Services() {
  const { services } = useRouteLoaderData("routes/vehicles.$id");

  return (
    <Suspense fallback={<CircularProgress />}>
      <Await resolve={services}>
        {(resolvedServices) => <Outlet context={resolvedServices} />}
      </Await>
    </Suspense>
  );
}
