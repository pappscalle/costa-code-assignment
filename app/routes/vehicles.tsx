import { Container } from "@mui/material";
import { Outlet, useLoaderData, type LoaderFunctionArgs } from "react-router";
import type { VehicleList } from "~/types/types";

export function shouldRevalidate({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}: {
  currentUrl: URL;
  nextUrl: URL;
  defaultShouldRevalidate: boolean;
}) {
  return currentUrl.pathname === "/vehicles";
}

export async function loader({}: LoaderFunctionArgs) {
  console.log("In the List of vehicles loader");

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
