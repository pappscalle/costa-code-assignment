import { Outlet, type LoaderFunctionArgs } from "react-router";
import type { VehicleList } from "~/types/types";

export async function loader({}: LoaderFunctionArgs) {
  console.log("Loading vehicles...");
  const result = await fetch("http://localhost:1337/vehicle/list");

  if (!result.ok) {
    throw new Response("Failed to load data", { status: result.status });
  }

  const data: VehicleList = await result.json();

  return data;
}

export default function Vehicles() {
  return <Outlet />;
}
