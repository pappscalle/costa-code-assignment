import {
  Outlet,
  useLoaderData,
  useRouteLoaderData,
  type LoaderFunctionArgs,
} from "react-router";
import type { VehicleList } from "~/types/types";
import { Typography } from "@mui/material";
import type { VehicleInformation, ServiceList } from "~/types/types";

export function shouldRevalidate({
  currentUrl,
  nextUrl,
}: {
  currentUrl: URL;
  nextUrl: URL;
}) {
  return currentUrl.pathname !== nextUrl.pathname;
}

export async function loader({ params }: LoaderFunctionArgs) {
  console.log("Loading vehicle details...");

  const id = params.id;
  if (!id) {
    throw new Response("Missing vehicle ID", { status: 400 });
  }

  const detailsPromise = fetch(
    `http://localhost:1337/vehicle/info?id=${id}`
  ).then(async (res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<VehicleInformation>;
  });

  const servicesPromise = fetch(
    `http://localhost:1337/vehicle/services?id=${id}`
  ).then(async (res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<VehicleInformation>;
  });

  return { id, details: detailsPromise, services: servicesPromise };
}

export default function Vehicle() {
  const { id, details, services } = useLoaderData<typeof loader>();
  const data = useRouteLoaderData<VehicleList>("routes/vehicles");
  const name = getVehicleName(data);

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

      <Outlet />
    </>
  );

  function getVehicleName(data: VehicleList | undefined) {
    const vehicle = data?.vehicles.find((v) => v.id === id);
    return vehicle?.name || "Unknown Vehicle";
  }
}
