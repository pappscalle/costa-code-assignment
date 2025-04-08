import {
  Await,
  Outlet,
  useLoaderData,
  useOutletContext,
  type LoaderFunctionArgs,
} from "react-router";
import type { VehicleList } from "~/types/types";
import { Alert, CircularProgress, Typography } from "@mui/material";
import type {
  VehicleInformation,
  ServiceList,
  DetailsAndServices,
} from "~/types/types";
import { Suspense } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) {
    throw new Response("Missing vehicle ID", { status: 400 });
  }

  const detailsPromise = fetch(
    `http://localhost:1337/vehicle/info?id=${id}`
  ).then(async (res) => {
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Unauthorized to access this vehicle");
      }
      throw new Error("Failed to load vehicle details");
    }
    return res.json() as Promise<VehicleInformation>;
  });

  const servicesPromise = fetch(
    `http://localhost:1337/vehicle/services?id=${id}`
  ).then(async (res) => {
    if (!res.ok) throw new Error("Failed to load vehicle services");
    return res.json() as Promise<ServiceList>;
  });

  return { id, combined: Promise.all([detailsPromise, servicesPromise]) };
}

export default function Vehicle() {
  const { id, combined } = useLoaderData<typeof loader>();
  const { vehicles } = useOutletContext<VehicleList>();
  const vehicle = vehicles.find((v) => v.id === id);
  const name = vehicle?.name || "Unknown Vehicle";

  return (
    <>
      <Typography variant="h2">Vehicle Information for '{name}'</Typography>
      <Typography
        variant="h6"
        sx={{ color: "text.secondary", mb: 1.5 }}
        gutterBottom
      >
        {id}
      </Typography>

      <Suspense fallback={<CircularProgress />}>
        <Await
          resolve={combined}
          errorElement={<Alert severity="error">Failed to load data</Alert>}
        >
          {([details, services]: [VehicleInformation, ServiceList]) => (
            <Outlet context={{ id, details, services }} />
          )}
        </Await>
      </Suspense>
    </>
  );
}
