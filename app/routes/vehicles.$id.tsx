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
  const result = await fetch(
    `http://localhost:1337/vehicle/info?id=${params.id}`
  );
  if (!result.ok) {
    throw new Response("Failed to load data", { status: result.status });
  }

  const data: Vehicle = await result.json();

  console.log("Data loaded successfully");
  console.log("Vehicle: ", data);
  return data;
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
