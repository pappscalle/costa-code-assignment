import { Container } from "@mui/material";
import { Outlet, useLoaderData, type LoaderFunctionArgs } from "react-router";

export interface Vehicle {
  id: string;
  name?: string;
}

export interface VehicleList {
  vehicles: Vehicle[];
}

export function shouldRevalidate({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}) {
  return currentUrl.pathname === "/vehicles";
}

export async function loader({}: LoaderFunctionArgs) {
  const result = await fetch("http://localhost:1337/vehicle/list");
  if (!result.ok) {
    throw new Response("Failed to load data", { status: result.status });
  }

  const data: VehicleList = await result.json();

  console.log("Loaded list of vehicles successfully");
  return data;
}

export default function Vehicles() {
  const data = useLoaderData<VehicleList>();

  return <Outlet context={data} />;
}
