import {
  Outlet,
  useLoaderData,
  useOutletContext,
  type LoaderFunctionArgs,
} from "react-router";
import type { VehicleList } from "~/types/types";
import { Typography } from "@mui/material";
import type {
  VehicleInformation,
  ServiceList,
  DetailsAndServices,
} from "~/types/types";

export async function loader({ params }: LoaderFunctionArgs) {
  const [vehicleDetails, vehicleServices] = await Promise.all([
    fetch(`http://localhost:1337/vehicle/info?id=${params.id}`),
    fetch(`http://localhost:1337/vehicle/services?id=${params.id}`),
  ]);

  if (!vehicleDetails.ok || !vehicleServices.ok) {
    throw new Response("Failed to load data", {
      status: 500,
    });
  }

  const details: VehicleInformation = await vehicleDetails.json();
  const services: ServiceList = await vehicleServices.json();

  //console.log("Services: ", services.services);

  const combinedData = {
    id: params.id,
    details,
    services,
  };
  console.log("Loaded vehicle details successfully");
  console.log("Loaded vehicle services successfully");
  //console.log("Vehicle: ", combinedData);
  return combinedData;
}

export default function Vehicle() {
  const data = useLoaderData<DetailsAndServices>();

  const { id } = data;
  const vehicleList = useOutletContext<VehicleList>();

  const vehicle = vehicleList.vehicles.find((vehicle) => vehicle.id === id);

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
      <Outlet context={data} />
    </>
  );
}
