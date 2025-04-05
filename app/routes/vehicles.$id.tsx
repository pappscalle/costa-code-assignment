import { useLoaderData, type LoaderFunctionArgs } from "react-router";

interface Vehicle {
  msidn: string;
  engineStatus: string;
  brand: string;
  countryOfOperation: string;
  chassisNumber: string;
  cassisSeries: string;
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
  const services = await vehicleServices.json();

  const combinedData = {
    details,
    services,
  };
  console.log("Data loaded successfully");
  console.log("Vehicle: ", combinedData);
  return combinedData;
}

export default function Vehicle() {
  //const vehicle = useLoaderData<Vehicle>();
  return (
    <div>
      <h1>Vehicle</h1>
      <p>This is the vehicle page.</p>
    </div>
  );
}
