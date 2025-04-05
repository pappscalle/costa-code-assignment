import { Outlet, type LoaderFunctionArgs } from "react-router";

export interface Vehicle {
  id: number;
  name?: string;
}

export interface VehicleList {
  vehicles: Vehicle[];
}

export async function loader({}: LoaderFunctionArgs) {
  const result = await fetch("http://localhost:1337/vehicle/list");
  if (!result.ok) {
    throw new Response("Failed to load data", { status: result.status });
  }

  const data: VehicleList = await result.json();

  console.log("Data loaded successfully");
  return data;
}

export default function Vehicles() {
  return <Outlet />;
}
