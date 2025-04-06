import { Outlet, useLoaderData, type LoaderFunctionArgs } from "react-router";

export interface Vehicle {
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

export interface LoaderResponse {
  id: string;
  details: Vehicle;
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

  const details: Vehicle = await vehicleDetails.json();
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
  const data = useLoaderData<LoaderResponse>();
  return <Outlet context={data} />;
}
