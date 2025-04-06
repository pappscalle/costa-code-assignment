import { Outlet, useLoaderData, useOutletContext } from "react-router";
import type { LoaderResponse } from "./vehicles.$id";

export default function Services() {
  const data = useOutletContext<LoaderResponse>();
  console.log("Services1: ", data);
  return <Outlet context={data} />;
}
