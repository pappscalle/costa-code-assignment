import {
  Outlet,
  useLoaderData,
  useOutletContext,
  type LoaderFunctionArgs,
} from "react-router";
import type { VehicleList } from "./vehicles";
import { Typography } from "@mui/material";

export interface VehicleInformation {
  msidn: string;
  engineStatus: string;
  brand: string;
  countryOfOperation: string;
  chassisNumber: string;
  cassisSeries: string;
}

export interface Service {
  serviceName: string;
  status: string;
  lastUpdate: string;
}

export interface ServiceList {
  communicationStatus: string;
  services: Service[];
}

export interface DetailsAndServices {
  id: string;
  details: VehicleInformation;
  services: ServiceList;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const vehicleDetails = await fetch(
    `http://localhost:1337/vehicle/info?id=${params.id}`
  );

  const vehicleServices = await fetch(
    `http://localhost:1337/vehicle/services?id=${params.id}`
  );

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
